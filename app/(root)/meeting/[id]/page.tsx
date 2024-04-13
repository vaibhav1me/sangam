"use client"
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({params} : {params: {id: string}}) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const {user, isLoaded} = useUser()

  return (
    <main className='h-screen w-full'>
      <StreamCall>
        <StreamTheme>
        {
          !isSetupComplete ? (<MeetingSetup/>) : (
            <MeetingRoom/>
          )
        }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting