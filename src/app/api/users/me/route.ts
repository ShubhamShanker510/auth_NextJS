import {connectDb} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'
import {NextRequest,NextResponse} from 'next/server'
import jwt from "jsonwebtoken"
import { getDataFromToken } from '@/helpers/getDataFromtoken'

connectDb()

export async function POST(request: NextRequest){
    // extract data from token
    const userId=await getDataFromToken(request)
    const user= await User.findOne({_id:userId}).select("-password")
    return NextResponse.json({message: "USer found", data: user})

}