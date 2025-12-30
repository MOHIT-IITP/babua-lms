'use client'
import GoogleLogo from '@/public/google-icon-logo-svgrepo-com.svg'
import  GithubLogo  from "@/public/github.svg";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export function GoogleAuthButton(){
     const {pending}= useFormStatus();

     return(
          <>
          {
               pending?(
                    <Button className='w-full' variant={"outline"} disabled>
                         <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                         Signing in...
                    </Button>
               ):(
                    <Button variant={"outline"} className="w-full flex items-center justify-center cursor-pointer">
                         <Image src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-2"/>
                         Sign in with Google
                    </Button>
               )
          }
          </>
     )
}
export function GithubAuthButton(){
     const {pending}= useFormStatus();

     return(
          <>
          {
               pending?(
                    <Button className='w-full' variant={"outline"} disabled>
                         <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                         Signing in...
                    </Button>
               ):(
                    <Button variant={"outline"} className="w-full flex items-center justify-center cursor-pointer">
                         <Image src={GithubLogo} alt="Google Logo" className="w-5 h-5 mr-2"/>
                         Sign in with Github
                    </Button>
               )
          }
          </>
     )
}