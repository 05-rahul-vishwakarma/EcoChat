import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectionDatabase/database";
import User from "@/lib/models/User";

export const POST = async (req) => {
    try {
        await connectToDB();
        let { username, email, password, confirmPassword } = await req.json();
        if (!username || !email || !password || !confirmPassword) {
            return NextResponse.json({
                message: "some important field is missing",
                status: 201
            })
        } else {
            if (password === confirmPassword) {
                password = confirmPassword
            } else {
                return NextResponse.json({
                    message: "password and confirm password is miss matched",
                    status: 201
                })
            }
        }

        let usernameExits = await User.findOne({ username })
        let emailExits = await User.findOne({ email })

        if (usernameExits) {
            return NextResponse.json({
                message: "username already exits",
                status: 200
            })
        }
        if (emailExits) {
            return NextResponse.json({
                message: "email already exits",
                status: 200
            })
        }

        const newUser = {
            username,
            email,
            password
        }

        const isCreated = await User.create(newUser)
        if (!isCreated) {
            return NextResponse.json({
                message:"something went wrong",
                status:500
            })
        }else{
            return NextResponse.json({
                message: "user is created",
                status: 200
            })
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "fail",
            status: 400
        })
    }
}