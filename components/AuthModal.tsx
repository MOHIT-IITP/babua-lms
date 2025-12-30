import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "@/app/lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export function AuthModal(){
     return(
          <Dialog>
               <DialogTrigger asChild>
                    <Button>Try for Free</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-90">
                    <DialogHeader className="flex gap-2 flex-row items-center">
                         {/* <Image src={"/"} alt="logo" className="size-10"/> */}
                         <h3 className="text-3xl font-semibold">Babua LMS</h3>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-3">
                         <form action={async()=>{
                              "use server"

                              await signIn("google")
                         }} className="w-full " >
                         
                         <GoogleAuthButton/>

                         </form>
                         <form className="w-full" action={
                              async ()=>{
                                   "use server"
                                   await signIn("github")
                              }
                         }>
                              <GithubAuthButton/>
                         </form>
                    </div>
               </DialogContent>
          </Dialog>
     )
}