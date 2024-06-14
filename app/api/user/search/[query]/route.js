import { connectToDB } from "@/lib/connectionDatabase/database";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const { query } = params

        const searchedContacts = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        })

        return new Response(JSON.stringify(searchedContacts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("something went wrong"), { status: 200 })

    }
}