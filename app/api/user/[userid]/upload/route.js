import { connectToDB } from "@/lib/connectionDatabase/database"
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    try {
        await connectToDB();
        const { userid } = params;
        const body = await req.json();
        const { username, profileImage } = body;
        const user = await User.findByIdAndUpdate(userid, {
            username,
            profileImage
        },
            { new: true }
        )
        console.log(user);
        return NextResponse.json({
            message: "okay",
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "something went wrong",
            status: 400
        })
    }
}