'use client'

import React, { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { gql, useQuery } from '@apollo/client'
import { apolloClient } from '@/lib/apollo-client'
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'

// Load Stripe once at module scope
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

// GraphQL queries and mutations
const GET_USER_PAYMENT_METHODS_QUERY = gql`
  query MyQuery {
    userPaymentMethods {
      cardBrand
      createdAt
      deleted
      expMonth
      expYear
      id
      isDefault
      last4Digits
      paymentMethodId
      paymentType
      updatedAt
    }
  }
`

const ADD_PAYMENT_METHOD_MUTATION = gql`
  mutation AddPaymentMethod(
    $cardBrand: CardBrandEnum!
    $expMonth: String!
    $expYear: String!
    $last4Digits: String!
    $paymentMethodId: String!
  ) {
    addPaymentMethod(
      cardBrand: $cardBrand
      expMonth: $expMonth
      expYear: $expYear
      last4Digits: $last4Digits
      paymentMethodId: $paymentMethodId
    ) {
      message
      success
    }
  }
`

const CREATE_COMMUNITY_MUTATION = gql`
  mutation CreateCommunity($name: String!, $planId: Int!) {
    createCommunity(name: $name, planId: $planId) {
      message
      success
    }
  }
`

interface PaymentMethod {
  id: string
  cardBrand: string
  expMonth: string
  expYear: string
  last4Digits: string
  paymentMethodId: string
  isDefault: boolean
  deleted: boolean
}

interface CreateCommunityModalProps {
  isOpen: boolean
  onClose: () => void
  planId?: number
}

// Get card brand icon/name for display
const getCardBrandDisplay = (brand: string) => {
  switch (brand.toUpperCase()) {
    case 'VISA':
      return 'Visa'
    case 'MASTERCARD':
      return 'Mastercard'
    case 'AMEX':
      return 'Amex'
    case 'DISCOVER':
      return 'Discover'
    case 'JCB':
      return 'JCB'
    case 'DINERS_CLUB':
      return 'Diners'
    case 'UNIONPAY':
      return 'UnionPay'
    default:
      return brand
  }
}

// Internal content that needs access to Stripe hooks
const ModalContent: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose, planId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  // Fetch existing payment methods
  const { data: paymentMethodsData, loading: paymentMethodsLoading } = useQuery(GET_USER_PAYMENT_METHODS_QUERY, {
    skip: !isOpen,
    errorPolicy: 'all'
  })

  // Map Stripe brand strings to backend CardBrandEnum values
  const mapStripeBrandToEnum = (brand?: string): string | null => {
    const b = (brand || '').toLowerCase()
    switch (b) {
      case 'visa':
        return 'VISA'
      case 'mastercard':
        return 'MASTERCARD'
      case 'amex':
      case 'american_express':
        return 'AMEX'
      case 'discover':
        return 'DISCOVER'
      case 'jcb':
        return 'JCB'
      case 'diners':
      case 'diners_club':
        return 'DINERS_CLUB'
      case 'unionpay':
        return 'UNIONPAY'
      default:
        return null
    }
  }

  const [groupName, setGroupName] = useState('')
  const [cardComplete, setCardComplete] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverSuccess, setServerSuccess] = useState<string | null>(null)
  
  // Payment method selection states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false)
  const [isGroupNameFocused, setIsGroupNameFocused] = useState(false)

  // Get active payment methods (not deleted)
  const activePaymentMethods = paymentMethodsData?.userPaymentMethods?.filter((pm: PaymentMethod) => !pm.deleted) || []
  
  // Set default payment method on load
  useEffect(() => {
    if (activePaymentMethods.length > 0 && !selectedPaymentMethod) {
      const defaultMethod = activePaymentMethods.find((pm: PaymentMethod) => pm.isDefault) || activePaymentMethods[0]
      setSelectedPaymentMethod(defaultMethod)
    }
  }, [activePaymentMethods, selectedPaymentMethod])

  // Determine if we should show new payment form
  const shouldShowNewPaymentForm = activePaymentMethods.length === 0 || showNewPaymentForm

  // Form validation
  const isFormComplete = !!groupName && typeof planId === 'number' && !isSubmitting && 
    (shouldShowNewPaymentForm ? true : !!selectedPaymentMethod)

  if (!isOpen) return null

  const handlePaymentMethodSelect = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod)
    setIsDropdownOpen(false)
    setShowNewPaymentForm(false)
  }

  const handleAddNewPaymentMethod = () => {
    setShowNewPaymentForm(true)
    setIsDropdownOpen(false)
  }

  const handleSubmit = async () => {
    setServerError(null)
    setServerSuccess(null)

    if (typeof planId !== 'number') {
      setServerError('Please select a plan before continuing.')
      return
    }

    setIsSubmitting(true)

    try {
      // If using new payment method, create it first
      if (shouldShowNewPaymentForm) {
        if (!stripe || !elements) {
          setServerError('Payment system not ready. Please try again.')
          return
        }

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
          setServerError('Unable to access card input. Please try again.')
          return
        }

        // Create Stripe PaymentMethod from the CardElement
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        })

        if (error || !paymentMethod) {
          setCardError(error?.message || 'Card validation failed.')
          setIsSubmitting(false)
          return
        }

        const enumBrand = mapStripeBrandToEnum(paymentMethod.card?.brand)
        if (!enumBrand) {
          throw new Error('Unsupported card brand. Please use a Visa, Mastercard, Amex, Discover, JCB, Diners Club, or UnionPay card.')
        }
        const expMonth = String(paymentMethod.card?.exp_month || '')
        const expYear = String(paymentMethod.card?.exp_year || '')
        const last4 = String(paymentMethod.card?.last4 || '')
        const pmId = paymentMethod.id

        // Add payment method to backend
        const { data: pmData } = await apolloClient.mutate({
          mutation: ADD_PAYMENT_METHOD_MUTATION,
          variables: {
            cardBrand: enumBrand,
            expMonth,
            expYear,
            last4Digits: last4,
            paymentMethodId: pmId,
          },
          errorPolicy: 'all',
        })

        if (!pmData?.addPaymentMethod?.success) {
          throw new Error(pmData?.addPaymentMethod?.message || 'Failed to add payment method.')
        }
      }

      // Create community with selected plan
      const { data: ccData } = await apolloClient.mutate({
        mutation: CREATE_COMMUNITY_MUTATION,
        variables: {
          name: groupName,
          planId: Number(planId),
        },
        errorPolicy: 'all',
      })

      if (!ccData?.createCommunity?.success) {
        throw new Error(ccData?.createCommunity?.message || 'Failed to create community.')
      }

      setServerSuccess('Community created successfully!')
      router.push('/communities') // Update this path as needed

      // Optionally clear the form and close modal
      setTimeout(() => {
        onClose()
      }, 800)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setServerError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-orange-500">s</span>
              <span className="text-blue-500">k</span>
              <span className="text-green-500">o</span>
              <span className="text-purple-500">o</span>
              <span className="text-red-500">l</span>
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Create your community</h2>
            <p className="text-sm text-gray-600">
              14-day free trial. $9/month Hobby plan{' '}
              <span onClick={() => onClose()} className="cursor-pointer text-blue-500">
                (change)
              </span>
              .
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Group Name */}
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  onFocus={() => setIsGroupNameFocused(true)}
                  onBlur={() => setIsGroupNameFocused(false)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  maxLength={30}
                  placeholder=""
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    isGroupNameFocused || groupName
                      ? '-top-2 text-xs bg-white px-1 text-blue-500'
                      : 'top-3 text-gray-500'
                  }`}
                >
                  Group name
                </label>
              </div>
              <div className="flex flex-row justify-between mt-1 items-center">
                <div className="text-xs text-gray-400">You can change this later</div>
                <div className="text-right text-xs text-gray-400">{groupName.length} / 30</div>
              </div>
            </div>

            {/* Payment Method Section */}
            {paymentMethodsLoading ? (
              <div className="p-4 text-center text-gray-500">Loading payment methods...</div>
            ) : (
              <>
                {/* Show "Use existing payment method" text only if we have methods and showing new payment form */}
                {activePaymentMethods.length > 0 && shouldShowNewPaymentForm && (
                  <div className="text-right mb-2">
                    <span 
                      className="text-blue-500 text-xs font-semibold hover:underline cursor-pointer"
                      onClick={() => setShowNewPaymentForm(false)}
                    >
                      Use an existing payment method
                    </span>
                  </div>
                )}

                {/* Payment Method Dropdown or New Payment Form */}
                {!shouldShowNewPaymentForm && activePaymentMethods.length > 0 ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full p-4 border border-gray-200 rounded-lg flex items-center justify-between bg-white hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <span className="text-sm text-gray-700">
                          {selectedPaymentMethod ? 
                            `${getCardBrandDisplay(selectedPaymentMethod.cardBrand)} •••• •••• •••• ${selectedPaymentMethod.last4Digits}` :
                            'Select payment method'
                          }
                        </span>
                      </div>
                      {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {/* Selected payment method highlighted */}
                        {selectedPaymentMethod && (
                          <div 
                            className="p-3 hover:bg-yellow-100 flex items-center space-x-3 cursor-pointer"
                            onClick={() => handlePaymentMethodSelect(selectedPaymentMethod)}
                          >
                            <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              VISA
                            </div>
                            <span className="text-sm text-gray-700">
                              {getCardBrandDisplay(selectedPaymentMethod.cardBrand)} •••• •••• •••• {selectedPaymentMethod.last4Digits}
                            </span>
                          </div>
                        )}

                        {/* Add new payment method option */}
                        <div 
                          className="p-3 flex items-center space-x-3 hover:bg-yellow-100 cursor-pointer "
                          onClick={handleAddNewPaymentMethod}
                        >
                          <Plus size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700">Add new payment method</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* New Payment Method Form */
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '14px',
                            color: '#1f2937',
                            '::placeholder': { color: '#9ca3af' },
                          },
                          invalid: { color: '#ef4444' },
                        },
                        hidePostalCode: false,
                      }}
                      onChange={(e) => {
                        setCardComplete(e.complete)
                        setCardError(e.error ? e.error.message ?? null : null)
                      }}
                    />
                    {cardError && <p className="text-xs text-red-600 mt-2">{cardError}</p>}
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormComplete}
              className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
                isFormComplete
                  ? 'bg-[#F8D481] hover:bg-[#F9D481] text-black'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'PROCESSING...' : 'START FREE TRIAL'}
            </button>

            {/* Server messages */}
            {serverError && <p className="text-sm text-red-600 mt-2">{serverError}</p>}
            {serverSuccess && <p className="text-sm text-green-600 mt-2">{serverSuccess}</p>}

            {/* Footer Text */}
            <p className="text-xs text-gray-500 mt-4">
              1st charge will be on August 27, 2025 for $9. We&apos;ll email you 3 days before to remind you. Cancel anytime with 1-click. Terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose, planId }) => {
  if (!isOpen) return null

  if (!stripePromise) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payments unavailable</h2>
          <p className="text-sm text-gray-600">
            Stripe could not initialize. Ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your environment and refresh the page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise}>
      <ModalContent isOpen={isOpen} onClose={onClose} planId={planId} />
    </Elements>
  )
}

export default CreateCommunityModal