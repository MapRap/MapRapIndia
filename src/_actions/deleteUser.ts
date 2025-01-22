"use server"

import prisma from "@/lib/db"

export const deleteUser=async (id:string)=>{
    try{

        const user=await prisma.user.delete({
            where:{id:id}
        })
        if(user){
            const realUser=await prisma.realUsers.delete({
                where:{id:id}
            })
            if(realUser){
                return {
                    message:"deleted"
                }
            }
        }
    }catch(err){
        console.log(err);
        return {
            message:err
        }
    }
}