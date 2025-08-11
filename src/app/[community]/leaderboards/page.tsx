import LeaderboardCard from '@/components/community/leaderboardCard'
import Image from 'next/image'
import React from 'react'

const page = () => {

<<<<<<< HEAD
    const UserLevel = () => {
        return (
            <div className=' flex items-center gap-2'>
                <div className='bg-black bg-opacity-20 h-fit w-fit rounded-full px-4 py-2'>
                    1
                </div>
                <div>
                    <p className='text-base font-semibold'>Level 1 - AI Explorer 🛠️</p>
                    <p className='text-sm text-gray-400'>93% of members</p>
                </div>
            </div>
        )
    }

=======
  const UserLevel = () => {
    return (
      <div className='flex items-center gap-2'>
        <div className='bg-[#313273] bg-opacity-20 rounded-full px-4 py-2 text-sm'>
          1
        </div>
        <div>
          <p className='text-base font-semibold'>Level 1 - AI Explorer 🛠️</p>
          <p className='text-sm text-gray-400'>93% of members</p>
        </div>
      </div>
    )
  }
>>>>>>> 6cb00ea6dd7370ef1aee3a4c760bc2e9b2167254

  return (
    <div className='w-full flex flex-col items-center gap-6 px-4'>
      {/* Profile + Levels */}
      <div className='bg-white flex flex-col lg:flex-row items-center justify-center gap-8 rounded-2xl w-full max-w-5xl py-6 px-6 shadow'>
        {/* Profile */}
        <div className='flex flex-col items-center text-center'>
          <div className="relative w-40 h-40 md:w-60 md:h-60 rounded-full bg-white shadow-inner p-1.5 border-[6px] border-[#f8f7f5]">
            <Image
              src="/head.jpg"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-[#4c56ac] text-white text-sm font-bold w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-[3px] border-white">
              1
            </div>
          </div>
          <div className='mt-4'>
            <p className='font-bold text-xl md:text-2xl'>John Doe</p>
            <p className='text-blue-800 font-semibold text-sm md:text-base'>Level 1 - AI Explorer 🛠️</p>
            <span className='flex gap-1 text-gray-300 justify-center text-sm'>
              <p className='text-blue-800'>5</p> points to level up
            </span>
          </div>
        </div>

        {/* Levels */}
        <div className='flex flex-wrap justify-center gap-8'>
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((item) => (
              <UserLevel key={item} />
            ))}
          </div>
          <div className='space-y-4'>
            {[1, 2, 3, 4].map((item) => (
              <UserLevel key={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Last updated */}
      <p className='text-sm italic text-gray-400 w-full max-w-4xl text-left'>
        Last updated: Jul 30th 2025 2:35pm
      </p>

      {/* Leaderboard Cards */}
      <div className='flex flex-wrap justify-center md:justify-between w-full max-w-5xl gap-4'>
        <LeaderboardCard />
        <LeaderboardCard />
        <LeaderboardCard />
      </div>
    </div>
  )
}

export default page
