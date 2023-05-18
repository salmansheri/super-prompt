'use client'; 

import React from 'react'; 
import Link from 'next/link'; 
import Image from 'next/image'; 
import { useState, useEffect } from 'react'; 
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'; 

type Props = {}

const Navbar = (props: Props) => {
    const {data: session} = useSession(); 
    const currentUser = session?.user?.email; 
    const [providers, setProviders] = useState(null); 
    const [toggleDropdown, setToggleDropdown] = useState(false); 

    useEffect(() => {
        const Providers = async () => {
            const response = await getProviders(); 
           // @ts-ignore
            setProviders(response); 
        }

        Providers(); 


    }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/logo.svg"
                alt="super"
                width={30}
                height={30}
                className="object-contain"
            />

        <p className="logo_text">
            Super Prompts


        </p>
        </Link>

        {/* Desktop navigation  */}
        <div className="sm:flex hidden ">
            {currentUser ? (
                <div className="flex gap-3 md:gap-5
                ">
                    <Link className="black_btn" href="/createprompt">
                        Create Post
                    </Link>
                    <button className="outline_btn" type="button" onClick={() => signOut()}>
                        Sign Out

                    </button>

                    <Link href="/profile">
                        <Image 
                            src="/assets/images/logo.svg"
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                        />
                    </Link>

                </div>

            ): (
                <>
                {/* {providers && 
                // @ts-ignore
                    Object.values(providers?.map((provider) => ( */}
                        <button type="button"
                            onClick={() => signIn('google')}
                            className="black_btn"
                        >
                            SignIn
                        </button>
                    {/* ))) */}
                {/* } */}

                </>

            )}
        </div>

        {/* MOBILE NAVIGATION  */}
        <div className="sm:hidden flex relative">
            {currentUser ? (
                <div className="flex">
                    <Image 
                            src="/assets/images/logo.svg"
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href="/profile"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link
                                href="/createprompt"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                                type="button"
                               
                                onClick={() => {
                                    setToggleDropdown(false); 
                                    signOut(); 
                                }}
                                className="mt-5 w-full black_btn"
                            >
                                Sign Out

                            </button>
                        </div>

                    ) }

                </div>


            ): (
                <>
                {/* {providers && 
                // @ts-ignore
                    Object.values(providers.map((provider) => ( */}
                        <button  type="button"
                            onClick={() => signIn('google')}
                            className="black_btn"
                        >
                            SignIn
                        </button>
                    {/* ))) */}
                {/* } */}

                </>


            )}

        </div>
        
    </nav>
  )
}

export default Navbar