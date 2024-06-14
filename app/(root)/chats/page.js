"use client"
import ChatList from "@/components/ChatList";
import Contacts from "@/components/Contacts";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";


function Chat() {
  return (
    <main className="main-container bg-blue-2 ">
      
    <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
      <ChatList />
    </div>

    <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
     <Contacts/>
    </div>

  </main>
  )
}

export default Chat