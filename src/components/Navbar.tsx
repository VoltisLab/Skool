"use client"

import { ChevronUp, ChevronDown, Search, Settings, Plus, Compass } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/contexts/AuthContext"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChevronClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleDropdownClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDropdownOpen(false)
    }
  }

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-2 sticky top-0 z-50">
        <div className="max-w-[1085px] mx-auto flex items-center justify-between">
          {/* Skool Logo */}
          <div className="flex items-center gap-2 relative">
            <div className="text-center">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <Image src="/logo.svg" alt="logo" height={30} width={30} />
                <p>VOLTIS LABS</p>
              </div>
            </div>
            <div 
              className="flex flex-col cursor-pointer hover:bg-gray-200 rounded-full px-2 transition-colors"
              onClick={handleChevronClick}
            >
              <ChevronUp className="h-4 w-4 text-gray-700" />
              <ChevronDown className="h-4 w-4 text-gray-700" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0  bg-white max-w-[230px] p-2 rounded-lg shadow-lg border border-gray-200 w-52 z-50">
                {/* Search Bar */}
                <div className="p-1 ">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-gray-200"
                    />
                    <Settings 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors" 
                      onClick={handleSettingsClick}
                    />
                  </div>
                </div>

                {/* Create a community */}
                <Link href="/create-account" className="">
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-1 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                      <Plus className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Create a community</span>
                  </div>
                </Link>

                {/* Discover communities */}
                <Link href="/" className="">
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-1 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Compass className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Discover communities</span>
                  </div>
                </Link>

                {/* User info and logout if authenticated */}
                {isAuthenticated && user && (
                  <>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-1 py-1">
                      <div className="text-xs text-gray-500 mb-1">Signed in as</div>
                      <div className="text-sm font-medium text-gray-900">{user.email}</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-1 rounded-lg transition-colors mt-2"
                    >
                      <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                        <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-red-600">Sign out</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Search Bar in Header - Only show when scrolled */}
          {isScrolled && (
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#909090] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full pl-10 py-4 text-sm border text-[#909090] placeholder:text-[#909090] placeholder:font-semibold border-gray-300 rounded-lg bg-gray-200 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}

          {/* Login/User Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName || user?.email}</span>
              <button 
                onClick={logout}
                className="px-5 font-bold py-2 text-sm text-[#909090] cursor-pointer bg-white border border-gray-300 rounded-md hover:text-gray-900 transition-colors"
              >
                LOG OUT
              </button>
            </div>
          ) : (
            <button 
              onClick={() => router.push('/login')} 
              className="px-5 font-bold py-2 text-sm text-[#909090] cursor-pointer bg-white border border-gray-300 rounded-md hover:text-gray-900 transition-colors"
            >
              LOG IN
            </button>
          )}
        </div>
      </header>

      {/* Backdrop for closing dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={handleDropdownClose}
        />
      )}
    </>
  )
} 