import prisma from "@/libs/prismaDB";
import getCurrentUser from "./getCurrentUser";




export default async function getPostById(id: string) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return null; 
        }

        const post = await prisma.prompt.findUnique({
            where: {
                id: id,
            },
            include: {
                creator: true,
            }
        })

        return post; 

    } catch(err) {

    }

}