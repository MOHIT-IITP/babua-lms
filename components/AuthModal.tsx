import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { signIn, signOut, auth } from "@/app/lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export async function AuthModal(){
     const session = await auth();
     const userName = session?.user?.name?.split(" ")[0] || "User";

     return(
          <Dialog>
               <DialogTrigger asChild>
                    <Button>{session ? userName : "Try for Free"}</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-90">
                    <DialogHeader className="flex gap-2 flex-row items-center">
                         {/* <Image src={"/"} alt="logo" className="size-10"/> */}
                         <h3 className="text-3xl font-semibold">Babua LMS</h3>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-3">
                         {session ? (
                              <form action={async()=>{
                                   "use server"
                                   await signOut()
                              }} className="w-full">
                                   <Button type="submit" className="w-full" variant="destructive">
                                        Sign Out
                                   </Button>
                              </form>
                         ) : (
                              <>
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
                              </>
                         )}
                    </div>
               </DialogContent>
          </Dialog>
     )
 
}