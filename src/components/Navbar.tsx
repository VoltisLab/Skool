"use client"

import { ChevronUp, ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2 sticky top-0 z-50 ">
      <div className="max-w-[1085px] mx-auto flex items-center justify-between">
        {/* Skool Logo */}
        <div className="flex items-center gap-2">
        <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-600">s</span>
              <span className="text-red-500">k</span>
              <span className="text-yellow-500">o</span>
              <span className="text-green-500">o</span>
              <span className="text-blue-600">l</span>
            </h1>
          </div>
          <div className="flex flex-col">
            <ChevronUp className="h-3 w-3 text-gray-400" />
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
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

        {/* Login Button */}
        <Link href="/login">
        <button className="px-5 font-bold py-2 text-sm text-[#909090] cursor-pointer bg-white border border-gray-300 rounded-md hover:text-gray-900 transition-colors">
          LOG IN
        </button>
        </Link>
      </div>
    </header>
  )
} 