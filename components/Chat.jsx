import { format } from 'date-fns';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

function Chat({ chat, currentUser , currentUserId }) {

    const otherMembers = chat?.members?.filter(
        (member) => member._id !== currentUser._id
    );
    const lastMessage = chat?.messages.length > 0 && chat?.messages[chat?.messages.length - 1];
    const router = useRouter();


    return (
        <div className='p-4 flex justify-between items-center m-2 hover:bg-slate-100 rounded-xl '
        onClick={()=>router.push(`/chats/${chat._id}`)}
         >
            <div className="chat-info  ">

                {
                    chat?.isGroup ? <Image
                        src={chat?.groupPhoto||"/group.png"}
                        alt="group photo"
                        width={50}
                        height={50}
                        className="profilePhoto"
                    /> : <Image
                        src={ otherMembers[0].profileImage||"/person.jpg"}
                        alt="profile-photo"
                        width={50}
                        height={50}
                        className="profilePhoto"
                    />
                }


                <div className="flex flex-col gap-1 capitalize leading-4 ">
                  {chat?.isGroup ?  <p className='text-small-bold' >{chat?.groupName}</p> :  <p className='text-small-bold ' >{otherMembers[0].username}</p> }
                  {!lastMessage && 
                    <p className='text-small-bold ' >tap to chat</p>
                   }
                </div>
            </div>

            <div className=' inline-block ' >
               {!lastMessage && format(new Date(chat?.createdAt),"p")} 
            </div>

        </div>
    )
}

export default Chat