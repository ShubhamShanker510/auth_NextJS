import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

export const sendEmail=async({email, emailType, userId}:any)=>{
    try {
        // hashing token for verifying email or reset password using bcrypt or even can use uuidv4 liraby also which dosent includ any special characters like bryptjs
        const hashedToken=await bcrypt.hash(userId.toString(),10)
        
        // creating mail html 
        const verifyHtml=`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> ${emailType==="VERIFY"?"verify your email":"reset your password"}
            or copy and paste the link in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        const resetHtml=`<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> ${emailType==="RESET"?"reset your password":"verify your email"}
            or copy and paste the link in your browser.
            <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>`
            
            console.log("Email Type: ", emailType);
            console.log("Type of email", typeof emailType)

            // saving token and token expiry in database
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
               $set:{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now()+3600000
               }
            })
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now()+3600000
                }
            })
        }

        // setup of mailtrap to see mails
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "a11276b5d45eef", //💀
            pass: "1ed0ebee19adbb" // 🗡️
            }
        });

            // what should mail include
          const mailOptions=await transport.sendMail({
            from: 'shubham@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType==='VERIFY'? "Verify your email": "Reset your password", // Subject line
            html: emailType==='VERIFY' ? verifyHtml: resetHtml
        });
        
        
        const mailResponse=await transport.sendMail(mailOptions)
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}