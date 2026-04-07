import React from 'react'
import Logo from './Logo'
import NewChatBtn from './NewChatBtn'
import ChatHistory from './ChatHistory'

const SideBar = () => {
  return (
    <div className='h-screen w-1/4'>
      <Logo/>
      <NewChatBtn/>
      <ChatHistory/>
    </div>
  )
}

export default SideBar
