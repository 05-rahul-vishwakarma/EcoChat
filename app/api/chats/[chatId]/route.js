import { connectToDB } from "@/lib/connectionDatabase/database"
import Chats from "@/lib/models/Chats";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        console.log("yes works");
        // console.log(params)
        const  { chatId }  = params;
        const chat = await Chats.findById(chatId);

        return NextResponse.json({
            message: "user data fetched successfully",
            status: 200,
            data:chat,
        })
    } catch (error) {
        return NextResponse.json({
            message: "something went wrong",
            status: 400,
        })
    }
}