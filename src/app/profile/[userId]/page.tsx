import React from 'react'
import ProfileClient from '../ProfileClient';
import getUserById from '@/actions/getUserById';


interface IParams {
    userId?: string; 
}

const ProfilePage = async ({params}: {params: IParams}) => {
    const { userId } = params;
    const user = await getUserById(userId as string); 
    console.log(user)
   
     
  return (
    <div>
        {/* @ts-ignore  */}
        <ProfileClient name={user?.name} desc={`Welcome to ${user?.name}'s Profile Page`} data={user?.prompts}

        />
    </div>
  )
}

export default ProfilePage; 