import { connectToDB } from "@/lib/connectionDatabase/database"
import Chats from "@/lib/models/Chat";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectToDB();
        let body = await req.json();
        const { currentUserId, members, isGroup, groupName } = body;
        const query = isGroup ? { isGroup, groupName, members: [currentUserId, ...members] } : { members: { $all: [currentUserId, ...members], $size: 2 } };
        let chat = await Chats.findOne(query);

        if (!query) {
            return NextResponse.json({
                message: "something went wrong",
                status: 500,
            })
        }
        if (chat) {
            return NextResponse.json({
                message: "chat already exits",
                status: 401,
            })
        }
        if (!chat) {
            const newChats = await Chats.create(isGroup ? query : { members: [currentUserId, ...members] });
            const updateAllMembers = newChats.members.map(async (memberId) => {
                await User.findByIdAndUpdate(
                    memberId,
                    {
                        $addToSet: { chats: newChats._id },
                    },
                    { new: true }
                );
            })
            Promise.all(updateAllMembers);
            return NextResponse.json({
                message: "contact is selected and pushes into the chats objs",
                status: 200,
            })

        }

    }

    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed",
            status: 500,
        })
    }
}

