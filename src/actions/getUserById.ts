import prisma from "@/libs/prismaDB";
import getCurrentUser from "./getCurrentUser";

export default async function getUserById(id: string) {
    try {
        const currentUser =await  getCurrentUser(); 
        if(!currentUser) {
            return null; 

        }
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                prompts: {
                    include: {
                        creator: true
                    }
                }
            }
        })
        if(!user) {
            return null; 
        }
        return user; 

    } catch(error: any) {

    }
}