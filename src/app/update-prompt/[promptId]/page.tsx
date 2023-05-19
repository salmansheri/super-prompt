import getPostById from '@/actions/getPostById';
import * as React from 'react';
import UpdatePromptClient from './UpdatePromptClient';
import { Prompt } from '@prisma/client';

interface IUpdatePromptPageProps {
    promptId?: string; 
}

const UpdatePromptPage
= async ({params}: {params: IUpdatePromptPageProps}) => {
    const { promptId } = params; 

    const post: Prompt | null | undefined  = await getPostById(promptId as string); 

  return(
    <div>
        <UpdatePromptClient 
            post={post}
        />
    </div>
  ) ;
};

export default UpdatePromptPage;
