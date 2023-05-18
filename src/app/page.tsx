import Feed from "@/components/Feed";


export default function Home() {
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
    <Feed />
   </section>
  )
}
