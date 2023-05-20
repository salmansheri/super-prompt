import prisma from "@/libs/prismaDB";
import getCurrentUser from "./getCurrentUser";

export default async function getPosts() {
    try {
        const currentUser = await getCurrentUser(); 

        if(!currentUser) {
            return null; 
        }
        const posts = await prisma.prompt.findMany({
            include: {
                creator: true,
            }
        }); 

        if(!posts) {
            return null; 
        }

        return posts; 

    } catch(error: any) {
        console.log(`${error}, POST_FETCH_ERROR`)
        return null; 
    }
}