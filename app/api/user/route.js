import { connectToDB } from "@/lib/connectionDatabase/database"
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async (req) =>{
  try {
  await connectToDB();
  const allUsers = await User.find();
  return NextResponse.json({
    message:"okay",
    status:200,
    data:allUsers
  })  
  } catch (error) {
    return NextResponse.json({
        message:"something went wrong",
        status:400
    }) 
  }
}