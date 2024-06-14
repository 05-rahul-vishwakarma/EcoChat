import { connectToDB } from "@/lib/connectionDatabase/database";
import Chats from "@/lib/models/Chats";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { query,userid } = params;
    const sortChats = await Chats.find({
      groupName: { $regex: query, $options: "i" },
    })
    return new Response(JSON.stringify(sortChats), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "some thing went wrong from the chatlist search",
      status: 500
    })
  }
}

