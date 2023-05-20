'use client'; 

import React from 'react'
import PromptCard from './PromptCard';
import { Prompt } from '@prisma/client';

type Props = {
  posts: Prompt[] | null; 
}

interface PromptCardListProps {
  data?: Prompt[] | null;
  handleTagClick: (tagName: any) => void; 
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
  const [prompts, setPrompts] = React.useState<Prompt[] | null>(posts); 
  const [searchTimeout, setSearchTimeout] = React.useState(null); 
  const [searchText, setSearchText] = React.useState("");
  const [searchedResult, setSearchResult] = React.useState(null); 

  const filterPrompts = (searchText: any) => {
    const regex  = new RegExp(searchText, 'i'); 

    return prompts?.filter((item) => 
    // @ts-ignore
                                regex.test(item.creator.name) || 
                                regex.test(item.tag) || 
                                regex.test(item.prompt)
        )

  }
  const handleSearchChange = (e: any) => {
    // @ts-ignore
    clearTimeout(searchTimeout)
    setSearchText(e.target.value); 

    // debounce method

    // @ts-ignore
    setSearchTimeout(setTimeout(() => {
      const searchResult = filterPrompts(e.target.value); 
      // @ts-ignore
      setSearchResult(searchResult); 
    }, 500))
  }

  console.log(prompts)

  const handleTagClick = (tagName: any) => {
    setSearchText(tagName); 
    const searchResult = filterPrompts(tagName); 
    // @ts-ignore
    setSearchResult(searchResult)

  }
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          className="search_input peer"
          onChange={(e) => handleSearchChange(e)}


        />

      </form>

      <PromptCardList 
        data={searchedResult}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed