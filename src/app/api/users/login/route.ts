import {connectDb} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'
import {NextRequest,NextResponse} from 'next/server'
import jwt from "jsonwebtoken"

connectDb()

export async function POST(request: NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody

        console.log(reqBody);

        const user=await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"},{status: 400})
        }
        console.log("user exists");

        const validPassword=await bcrypt.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error: "Check your credentials"},{status: 400})
        }

        const payload={
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token=jwt.sign(payload,process.env.TOKEN_SECRET!,{expiresIn: '1d'})

        const response=NextResponse.json({
            message: "Logged in Success",
            success: true
        })
        response.cookies.set("token",token,{
            httpOnly: true
        })

        return response

        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}