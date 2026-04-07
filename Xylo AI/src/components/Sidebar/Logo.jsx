import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-3'>
      <img
        className='h-10 w-10 rounded-full object-cover border border-emerald-500/70 shadow-md shadow-emerald-900/60'
        src='/Logo.png'
        alt='Xylo AI logo'
      />
      <div>
        <h1 className='text-sm font-semibold tracking-wide'>Xylo AI</h1>
        <p className='text-[11px] text-slate-500'>Crop advisor chatbot</p>
      </div>
    </div>
  )
}

export default Logo
