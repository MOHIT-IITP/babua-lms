import { HomePage } from "@/components/HomePage/HomePage"
import { requireUser } from "./lib/hooks"
import { redirect } from "next/navigation";

const page =async () => {
  const session = await requireUser();
  if(session?.user) return redirect("/dashboard");
  return (
    <HomePage/>
  )
}

export default page