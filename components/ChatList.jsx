"use client";

import React, { useEffect, useState } from 'react'
import Chat from './Chat';
import { useSession } from 'next-auth/react';

function ChatList({ currentUserId }) {

  const { data: session } = useSession();
  const currentUser = session?.user;
  const [chatData, setChatData] = useState([]);
  const [search, setSearch] = useState("");

 const getChatData = async () => {
    try {
      if (search === "") {
        let res = await fetch(`/api/user/${currentUser?.id}`);
        res = await res.json();
        setChatData(res?.data)
      } else {
        let res = await fetch(`/api/user/${currentUser?.id}`);
        res = await res.json()
        console.log(res);
        setChatData(res?.data.filter(member => {
          return (member?.isGroup === true) ? member?.groupName?.toLowerCase().includes(search.toLowerCase()) :
            member.members[1].username.toLowerCase().includes(search.toLowerCase())
        }
        ))
      }

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (currentUser) getChatData()
  }, [currentUser, search]);


  return (
    <div className=' '>
      <div className="chat-list">
        <input
          placeholder="Search chat..."
          className="input-search p-4 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='min-h-full bg-white rounded-2xl mt-0.5' >
          {
            chatData?.map((item, i) => (
              <Chat key={i} chat={item} currentUser={currentUser} currentUserId={currentUserId} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ChatList
