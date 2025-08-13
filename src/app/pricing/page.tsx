"use client"

  import { useEffect, useMemo, useState } from 'react'
  import { useRouter, useSearchParams } from 'next/navigation'
  import { Check, X } from 'lucide-react'
  import { useAuth } from '@/lib/contexts/AuthContext'
  import CreateCommunityModal from '@/components/modals/CreateCommunityModal'
  import { gql } from '@apollo/client'
  import { apolloClient } from '@/lib/apollo-client'

  const ALL_PLANS_QUERY = gql`
    query AllPlans {
      allPlans {
        id
        name
        description
        price
        billingCycle
        numberOfMembers
        numberOfCourses
        numberOfAdmins
        transactionFee
        isCustomUrlAllowed
        hideSuggestedCommunities
        stripePriceId
        stripeProductId
        updatedAt
        createdAt
        deleted
      }
    }
  `

  interface Plan {
    id: number
    name: string
    description?: string | null
    price?: number | null
    billingCycle?: string | null
    numberOfMembers?: number | null
    numberOfCourses?: number | null
    numberOfAdmins?: number | null
    transactionFee?: number | null
    isCustomUrlAllowed?: boolean | null
    hideSuggestedCommunities?: boolean | null
    deleted: boolean
    stripePriceId?: string | null
    stripeProductId?: string | null
    updatedAt: string
    createdAt: string
  }

  export default function PricingPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { isAuthenticated, isLoading } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null)

    const [plans, setPlans] = useState<Plan[]>([])
    const [plansLoading, setPlansLoading] = useState<boolean>(true)
    const [plansError, setPlansError] = useState<string | null>(null)

    // Fetch plans
    useEffect(() => {
      let active = true
      ;(async () => {
        setPlansLoading(true)
        setPlansError(null)
        try {
          const { data } = await apolloClient.query({ query: ALL_PLANS_QUERY, fetchPolicy: 'no-cache' })
          if (!active) return
          // Normalize id to number early; filter out deleted
          const normalized: Plan[] = (data?.allPlans ?? [])
            .filter((p: Plan) => !p?.deleted)
            .map((p: Plan) => ({
              ...p,
              id: Number(p.id),
            }))
          setPlans(normalized)
        } catch (err) {
          if (!active) return
          const message = err instanceof Error ? err.message : 'Failed to load plans.'
          setPlansError(message)
        } finally {
          if (active) setPlansLoading(false)
        }
      })()
      return () => {
        active = false
      }
    }, [])

    // Auto open modal if coming from plan selection intent
    useEffect(() => {
      const open = searchParams?.get('openCreate')
      const planParam = searchParams?.get('plan')
      if (planParam) {
        const parsed = parseInt(planParam, 10)
        if (!Number.isNaN(parsed)) setSelectedPlanId(parsed)
      }
      if (open === '1') {
        setIsModalOpen(true)
      }
    }, [searchParams])

    const handleSelectPlan = (planId: number) => {
      const idNum = Number(planId)
      if (Number.isNaN(idNum)) {
        console.warn('Invalid planId passed to handleSelectPlan:', planId)
        return
      }
      setSelectedPlanId(idNum)

      // Ensure user is logged in; if not, redirect to login then back here with openCreate
      if (!isAuthenticated && !isLoading) {
        const nextUrl = `/pricing?openCreate=1&plan=${idNum}`
        router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
        return
      }

      setIsModalOpen(true)
    }

    const renderedPlans = useMemo(() => plans, [plans])

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-black">s</span>
              <span className="text-black">k</span>
              <span className="text-black">o</span>
              <span className="text-black">o</span>
              <span className="text-black">l</span>
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">Select your plan</h2>
        </div>

        {/* Plans content */}
        {plansLoading && <div className="text-gray-600">Loading plans...</div>}
        {plansError && <div className="text-red-600">{plansError}</div>}

        {!plansLoading && !plansError && (
          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full">
            {renderedPlans.map((plan) => {
              const priceLabel =
                typeof plan.price === 'number'
                  ? `$${plan.price}/${plan.billingCycle ?? 'month'}`
                  : plan.billingCycle ?? 'Plan'
              return (
                <div key={plan.id} className="bg-white rounded-lg shadow-lg p-8 flex-1">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{priceLabel}</div>
                    <div className="text-lg font-medium text-gray-900">{plan.name}</div>
                    {plan.description && <div className="text-sm text-gray-600 mt-2">{plan.description}</div>}
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{plan.numberOfMembers ?? 'Unlimited'} members</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{plan.numberOfCourses ?? 'Unlimited'} courses</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{plan.numberOfAdmins ?? '1'} admin</span>
                    </div>
                    {typeof plan.transactionFee === 'number' ? (
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{plan.transactionFee}% transaction fee</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-3">
                      {plan.isCustomUrlAllowed ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-gray-400" />}
                      <span className="text-gray-700">Custom URL</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {plan.hideSuggestedCommunities ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-gray-400" />}
                      <span className="text-gray-700">Hide suggested communities</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(Number(plan.id))}
                    className="w-full bg-[#F8D481] hover:bg-[#F8D481]/90 text-black font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    TRY FOR FREE
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer - Transaction Fees Comparison */}
        <div className="text-center mt-12 max-w-2xl">
          <p className="text-sm text-gray-600 mb-6">* Skool has the lowest transaction fees</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Discord</span>
              <span className="font-medium">16%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patreon</span>
              <span className="font-medium">14%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Whop</span>
              <span className="font-medium">13%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Circle</span>
              <span className="font-medium">7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stan</span>
              <span className="font-medium">6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Skool</span>
              <span className="font-medium text-black">2.9%</span>
            </div>
          </div>
        </div>

        {/* Create Community Modal */}
        <CreateCommunityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planId={selectedPlanId ?? undefined}
        />
      </div>
    )
  }