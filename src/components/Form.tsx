'use client'; 
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'; 

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-hot-toast'; 

type Props = {
  type?: string; 
 
}

const Form = ({type}:  Props) => {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false); 
  const { register, watch, handleSubmit, formState: {errors} }  = useForm<FieldValues>({
    defaultValues: {
      prompt: "",
      tag: "",
    }
  })

  const prompt = watch('prompt');
  const tag = watch("tag");  

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true); 
    
    axios.post("/api/prompts", data)
      .then((res) => {
      toast.success("Successfully created"); 
      router.push("/"); 
      
      
    })
      .catch((error: any) => {
        console.log(error)
        console.log(errors); 
        toast.error("someting went wrong")
      })
      .finally(() => {
        setIsLoading(false); 
      })


  } 
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">

        <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing Prompts with the world, and let your imagination run wild with any AI-Powered platform

        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea 
          value={prompt}
            {...register('prompt', {required: true})}
            placeholder='Write your Prompt here...'
            required
            className="form_textarea"
          />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag{" "}
              <span>(#product, #webdevelopment, #idea)</span>
              
            </span>
          <input 
          value={tag}
            {...register('tag', {required: true})}
            placeholder='#tag'
            required
            className="form_input"
            
          />
          </label>

          <div className="flex-end mx-3 mb-5 gap-4 ">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel

            </Link>
            <button
              type="submit"
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              disabled={isLoading}
            >
              {isLoading ? `${type}ing...` : type}

            </button>

          </div>




        </form>

    </section>
  )
}

export default Form