'use client'; 

import React from 'react'; 
import PromptCard from '@/components/PromptCard';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Props = {
    name: string; 
    desc?: string; 
    data?: Array<any> | null;
}

type PromptCardListProps = {
    data?:  Array<any> | null; 
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void; 

}



const ProfileClient = ({name, desc, data}: Props) => {
    const router = useRouter(); 

    const handleEdit = React.useCallback((id: string) => {
        router.push(`/update-prompt/${id}`)

    }, [router]); 

    const handleDelete = React.useCallback((id: string) => {
        axios.delete(`/api/prompts/${id}`)
            .then(() => {
                toast.success("Successfully Deleted"); 
                router.refresh(); 
            })
            .catch((error) => 
                {toast.error("Something went Wrong")}
            )
            

    }, [router])
  return (
    <section className="w-full">
        <h1 className='head_text text-left blue_gradient'>{name}</h1>
        <p className="desc text-left">{desc}</p>
       <div className='mt-10 prompt_layout'>
        {data?.map((post) => (
            <PromptCard 
                key={post.id}
                post={post}
                handleDelete={() => handleDelete && handleDelete(post.id)}
                handleEdit={() => handleEdit(post.id)}
            />
        ))}

       </div>

    </section>
  )
}

export default ProfileClient