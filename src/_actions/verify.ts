"use server"
import prisma from "@/lib/db"

export const verifyUser=async (id:string)=>{
    try{

        const user=await prisma.realUsers.update({
            where:{id:id},
            data:{
                isReal:true
            }
        })
        if(!user){
            return {message:"No such user"}
        }
        return {message:"Verified User"}
    }catch(err){
        console.log(err);
        return {message:"Operation failed"}
    }

}