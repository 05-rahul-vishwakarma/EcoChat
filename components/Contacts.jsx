"use client"

import { useSession } from 'next-auth/react';
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { getChatData } from './ChatList';

function Contacts() {
    const { data: session } = useSession();
    const currentUser = session?.user;

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    const getUsers = async () => {
        try {
            if (search === "") {
                let res = await fetch("api/user");
                const data = await res.json();
                setContacts(data?.data.filter((contact) => contact._id !== currentUser._id));
            } else {
                let res = await fetch(`api/user/search/${search}`);
                const data = await res.json();
                console.log(data);
                setContacts(data?.filter((contact) => contact._id !== currentUser._id));
                // setContacts(data?.data.filter((contact) => contact._id !== currentUser._id));
            }

        } catch (error) {
            console.log(error);
        }
    }

    /* SELECT CONTACT */
    const [selectedContacts, setSelectedContacts] = useState([]);
    const isGroup = selectedContacts.length > 1;

    const handleSelect = (contact) => {

        if (selectedContacts.includes(contact)) {
            setSelectedContacts((prevSelectedContacts) =>
                prevSelectedContacts.filter((item) => item !== contact)
            );
        } else {
            setSelectedContacts((prevSelectedContacts) => [
                ...prevSelectedContacts,
                contact,
            ]);
        }

    };

    /* ADD GROUP CHAT NAME */
    const [name, setName] = useState("");


    const createChat = async () => {
        try {

            let body = {
                currentUserId: currentUser._id,
                members: selectedContacts.map((contacts) => contacts._id),
                groupName: name,
                isGroup
            }

            let config = {
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify(body)
            }
            let res = await fetch("/api/chats", config)
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                location.reload();
            }if (res.status == 401) {
                alert("chat already exits")
                location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (currentUser) getUsers()
    }, [currentUser, search]);





    return (
        <div className="create-chat-container">
            <input
                placeholder="Search contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='p-3.5 rounded-2xl outline-none '
            />

            <div className="contact-bar">
                <div className="contact-list">
                    <p className="text-body-bold">Select or Deselect</p>
                    {
                        contacts.map((user, i) => (
                            <div
                                className="contact  hover:bg-slate-100 rounded-xl "
                                key={i}
                                onClick={() => handleSelect(user)}

                            >
                                {selectedContacts.find((item) => item === user) ? (
                                    <CheckCircle sx={{ color: "red" }} />
                                ) : (
                                    <RadioButtonUnchecked />
                                )}
                                <Image
                                    src={user.profileImage || "/person.jpg"}
                                    alt="profile"
                                    width={50}
                                    height={50}
                                    className="profilePhoto"
                                />
                                <p className="text-base-bold"> {user?.username} </p>
                            </div>
                        ))
                    }
                    <div className="flex flex-col flex-1 gap-5 overflow-y-scroll custom-scrollbar">
                    </div>
                </div>

                <div className="create-chat">
                    {isGroup && (
                        <>
                            <div className="flex flex-col gap-3">
                                <p className="text-body-bold">Group Chat Name</p>
                                <input
                                    placeholder="Enter group chat name..."
                                    className="input-group-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-body-bold">Members</p>
                                <div className="flex flex-wrap gap-3">
                                    {selectedContacts.map((contact, index) => (
                                        <p className="selected-contact" key={index}>
                                            {contact.username}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        className="btn"
                        onClick={createChat}
                        disabled={selectedContacts.length === 0}
                    >
                        FIND OR START A NEW CHAT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Contacts