'use client'; 

import React from 'react'
import PromptCard from './PromptCard';
import { Prompt } from '@prisma/client';

type Props = {
  posts: Prompt[] | null; 
}

interface PromptCardListProps {
  data?: Prompt[] | null;
  handleTagClick: () => void; 
}


const PromptCardList = ({data, handleTagClick}: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post: Record<string, any>) => (
        <PromptCard 
          key={post?.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </div>
  )

}

const Feed = ({posts}: Props) => {
  const [searchText, setSearchText] = React.useState("");
  const handleSearchChange = () => {

  }
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          className="search_input peer"
          onChange={handleSearchChange}


        />

      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />

    </section>
  )
}

export default Feed