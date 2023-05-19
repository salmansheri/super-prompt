import Feed from "@/components/Feed";
import getPosts from "@/actions/getPosts";

export const revalidate = 10; 
export default async function Home() {
  const posts = await getPosts(); 

  

  return (
   <section className="w-full flex flex-center flex-col ">
    <h1 className="head_text text-center">
      Discover and Share
      <br  className="max-md:hidden"/>
      <span className="orange_gradient text-center">AI Powered Prompt</span>
    </h1>
    <p className="desc text-center">
      Super Promts is an open-source AI prompting tool for modern world to discover, create and share creative prompts
    </p>
    {/* Feed  */}
    <Feed posts={posts} />
   </section>
  )
}
