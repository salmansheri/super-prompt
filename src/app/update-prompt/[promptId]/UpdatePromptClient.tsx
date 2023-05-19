'use client';

import { Prompt } from '@prisma/client';
import * as React from 'react';
import Form from './components/Form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface IUpdatePromptClientProps {
    post?: Prompt | null | undefined; 
}

const UpdatePromptClient: React.FC<IUpdatePromptClientProps> = ({
    post
}) => {
    const [isLoading, setIsLoading] = React.useState(false); 
    const [prompt, setPrompt] = React.useState<any>({
        prompt: "",
        tag: "",
    }); 



    React.useEffect(() => {
        setPrompt({
            // @ts-ignore
            prompt: post?.prompt,
            // @ts-ignore
            tag: post?.tag
        })

    }, [post?.prompt, post?.tag]); 

    const handleUpdate = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); 
      console.log(post)
      setIsLoading(true); 
      axios.patch(`/api/prompts/${post?.id}`, {
          prompt: prompt.prompt,
          tag: prompt.tag
      })
          .then(() => {
              toast.success("successfully Edited")
  
          })
          .catch((error) => {
              console.log(error); 
              toast.error("Something went wrong")
          })
          .finally(() => {
              setIsLoading(false); 
          })
  
  
    }, [post, prompt.prompt, prompt.tag])


  return (
    <div>
     <Form 
        post={prompt}
        handleSubmit={handleUpdate}
        setPost={setPrompt}
        submitting={isLoading}
        type="Update"

     />
        
    </div>
  );
};

export default UpdatePromptClient;
