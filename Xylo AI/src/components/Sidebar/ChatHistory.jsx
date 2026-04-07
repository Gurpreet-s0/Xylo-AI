import React from 'react'

const pinnedChats = ['Wheat disease diagnosis', 'Best crop for Punjab', 'Soil help']

const ChatHistory = () => {
  return (
    <div className='text-slate-300 text-sm'>
      <p className='text-xs uppercase tracking-wide text-slate-500 mb-2'>
        Chat history
      </p>
      <div className='space-y-1'>
        {pinnedChats.map((title) => (
          <button
            key={title}
            type='button'
            className='w-full text-left px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/90 border border-transparent hover:border-emerald-500/70 text-xs transition-colors'
          >
            {title}
          </button>
        ))}
      </div>

      <p className='mt-5 text-xs uppercase tracking-wide text-slate-500 mb-2'>
        Settings
      </p>
      <button
        type='button'
        className='w-full text-left px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/90 text-xs text-slate-300 transition-colors'
      >
        English
      </button>
    </div>
  )
}

export default ChatHistory
