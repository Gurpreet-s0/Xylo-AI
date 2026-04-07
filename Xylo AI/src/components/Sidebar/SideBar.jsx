import React from 'react'
import Logo from './Logo'
import NewChatBtn from './NewChatBtn'
import ChatHistory from './ChatHistory'

const SideBar = ({ onNewChat }) => {
  return (
    <div className='h-screen w-72 bg-slate-950/95 border-r border-slate-800/80 flex flex-col'>
      <div className='px-4 py-4'>
        <Logo />
      </div>
      <div className='border-t border-slate-800/80' />
      <div className='px-4 py-4'>
        <NewChatBtn onClick={onNewChat} />
      </div>
      <div className='border-t border-slate-800/80' />
      <div className='flex-1 overflow-y-auto px-3 py-4'>
        <ChatHistory />
      </div>
      <div className='border-t border-slate-800/80' />
      <div className='px-4 py-3 text-xs text-slate-500'>
        <p>Settings</p>
        <p className='mt-1 text-[11px] text-slate-600'>English · Dark theme</p>
      </div>
    </div>
  )
}

export default SideBar
