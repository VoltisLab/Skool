"use client"
import CommunityCard from '@/components/community/communityCard'
import MemberList from '@/components/community/memberList'
import CommunityTabs from '@/components/community/memberTab'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center px-4'>
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6'>
        
        {/* Main content (tabs + members) */}
        <div className="lg:col-span-3 space-y-6">
          <CommunityTabs />
          <MemberList />
        </div>

        {/* Sidebar card */}
        <div className="lg:col-span-1">
          <CommunityCard />
        </div>
      </div>
    </div>
  )
}

export default page
