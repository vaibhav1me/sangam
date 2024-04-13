import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center h-screen w-full'>
        <Image alt='Loading' src="/icons/loading-circle.svg" height={50} width={50}/>
    </div>
  )
}

export default Loader