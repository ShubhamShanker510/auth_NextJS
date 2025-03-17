import {connectDb} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { request } from 'http'
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connectDb()

export async function POST(request: NextRequest){
    try {
        const reqBody=await request.json()
        const {username, email,password}=reqBody;

        //validation
        console.log(reqBody);

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exist"},{status: 400})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUSer=await newUser.save()
        console.log(savedUSer);


        //send verification email
        await sendEmail({email, emailType: "VERIFY",userId: savedUSer._id})

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUSer
        })

        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{
            status:500
        })
    }
}

