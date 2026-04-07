import React from 'react'

const NewChatBtn = () => {
  return (
    <button className='w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-medium text-white py-2.5 px-4 shadow-md shadow-emerald-900/40 transition-colors'>
      <span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-300/70 text-xs'>
        +
      </span>
      New Chat
    </button>
  )
}

export default NewChatBtn
