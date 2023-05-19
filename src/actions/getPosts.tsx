import prisma from "@/libs/prismaDB";

export default async function getPosts() {
    try {
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