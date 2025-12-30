
import { requireUser } from "../lib/hooks";

export default async  function DashboardPage(){
     const session = await requireUser();

if(session){

     return(
          <div>
               <h1>
                    Hello from the DashboardPage...!!!
               </h1>
          </div>
     )
}
}