"use client";

import { AddPhotoAlternate } from '@mui/icons-material'
import { useSession } from 'next-auth/react';
import { CldUploadButton } from 'next-cloudinary'
import React ,{useEffect} from 'react'

function ChatDetails({chatId}) {

  // console.log(chatId);
  
  const {data:session} = useSession();
  const currentUser = session?.user;

  const getChatDetails = async () => {
    try {
      let res = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res)
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  
  return (
    <div className="pb-20 ">
    <div className="chat-details">
      <div className="chat-header">
        chat header
      </div>

      <div className="chat-body">
        chat body        
      </div>

      <div className="send-message">
        <div className="prepare-message">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            // onUpload={sendPhoto}
            uploadPreset="upecg01j"
          >
            <AddPhotoAlternate
              sx={{
                fontSize: "35px",
                color: "#737373",
                cursor: "pointer",
                "&:hover": { color: "red" },
              }}
            />
          </CldUploadButton>

          <input
            type="text"
            placeholder="Write a message..."
            className="input-field"
            required
          />
        </div>

        <div>
          <img src="/send.jpg" alt="send" className="send-icon" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ChatDetails