import React from 'react'
import SideBar from './components/Sidebar/SideBar'
import ChatWindow from './components/ChatWindow'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex'>
      <SideBar />
      <ChatWindow />
    </div>
  )
}

export default App
