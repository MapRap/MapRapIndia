"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Unauthorized = () => {
    const router=useRouter()
    return(<div className="h-screen bg-black w-screen text-white text-2xl flex items-center justify-center flex-col">
        <div>
          You are not authorized to view this page, login as the required user to access this page
          
          </div>
      <Button className="bg-blue-800 hover:bg-blue-900 m-4" onClick={()=>{
        router.push(`/`)
      }}>Go to Home page</Button></div>)
}

export default Unauthorized