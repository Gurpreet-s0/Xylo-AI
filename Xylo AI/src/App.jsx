import React, { useState } from 'react'
import SideBar from './components/Sidebar/SideBar'
import ChatWindow from './components/ChatWindow'

const App = () => {
  const [resetCounter, setResetCounter] = useState(0)

  const handleNewChat = () => {
    setResetCounter((prev) => prev + 1)
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex'>
      <SideBar onNewChat={handleNewChat} />
      <ChatWindow resetCounter={resetCounter} />
    </div>
  )
}

export default App
