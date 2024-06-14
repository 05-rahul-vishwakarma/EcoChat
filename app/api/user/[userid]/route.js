

import { connectToDB } from "@/lib/connectionDatabase/database"
import Chats from "@/lib/models/Chat";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { userid } = params;
    const allChats = await Chats.find({ members: userid })
      .sort({ lastMessage: -1 })
      .populate({
        path: "members",
        model: User,
      }).exec();
      return NextResponse.json({
        message: "some thing went wrong",
        status: 500,
        data:allChats
      })
  } catch (error) {
    return NextResponse.json({
      message: "some thing went wrong",
      status: 500
    })
  }
}