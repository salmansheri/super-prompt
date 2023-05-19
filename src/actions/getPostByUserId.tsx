import prisma from "@/libs/prismaDB"; 

export default async function getPostByUserId(userId: string) {
    try {
        const posts = await prisma.prompt.findMany({
            where: {
                creatorId: userId
            }, 
            include: {
                creator: true,
            }
        }); 

        if(!posts ) {
            return null; 
        }

        return posts; 

    } catch(error: any) {
        console.log(error, "GETPOSTBYID_ERRRO"); 
        return null; 
    }
}