import React from 'react'
import Logo from './Logo'
import NewChatBtn from './NewChatBtn'
import ChatHistory from './ChatHistory'

const SideBar = () => {
  return (
    <div className='h-screen w-1/4'>
      <Logo/>
      <div className='border-white border-[1px] opacity-10'></div>
      <NewChatBtn/>
      <div className='border-white border-[1px] opacity-10'></div>

      <ChatHistory/>
    </div>
  )
}

export default SideBar
