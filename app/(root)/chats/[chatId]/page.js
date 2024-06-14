import ChatDetails from '@/components/ChatDetails'
import ChatList from '@/components/ChatList'
import React from 'react'

function ChatPage() {
  return (
    <div className="main-container">
    <div className="w-1/3 max-lg:hidden"><ChatList /></div>
    <div className="w-2/3 max-lg:w-full"><ChatDetails /></div>
  </div>
  )
}

export default ChatPage