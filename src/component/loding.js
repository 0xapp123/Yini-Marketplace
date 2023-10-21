import React from 'react'

export default function LoadingModal () {
  return (
    <div className='z-[999999] w-screen md:w-full flex h-full min-h-screen top-0 left-0 bg-black/40 fixed'>
      <div className='w-full h-screen bg-cover flex px-8 py-20 justify-center items-center '>
        <div
          className='inline-block h-20 w-20 animate-spin text-pink-500 rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_2.5s_linear_infinite] ${'
          role='status'
        >
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      </div>
    </div>
  )
}
