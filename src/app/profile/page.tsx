'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage(){
    const router=useRouter()
    const [data,setdata]=useState("nothing")

    const getUserDetails=async()=>{
        try {
            const response=await axios.post("/api/users/me")
            console.log(response.data)
            setdata(response.data.data._id)
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
  
    
    const logout=async()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1> Profile page</h1>
       <hr />
       <h2 className='bg-orange-500 p-2 rounded'>{data==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
       <hr />
       <button
       className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
       onClick={logout}
       >logout</button>
        <hr />
       <button
       className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
       onClick={getUserDetails}
       >Get user details</button>
    </div>
  )
}
