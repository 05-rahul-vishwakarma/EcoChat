"use client";

import { AddPhotoAlternate } from '@mui/icons-material'
import { CldUploadButton } from 'next-cloudinary'
import React from 'react'

function ChatDetails() {
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