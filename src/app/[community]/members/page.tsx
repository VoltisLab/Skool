"use client"
import CommunityCard from '@/components/community/communityCard'
import MemberList from '@/components/community/memberList'
import CommunityTabs from '@/components/community/memberTab'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className='w-[65%] grid grid-cols-4 gap-4'>
            <div className="col-span-3 h-full ">
                <CommunityTabs/>
                <MemberList/>
            </div>

        <CommunityCard/>
        </div>
    </div>
  )
}

export default page