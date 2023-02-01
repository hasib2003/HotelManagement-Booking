import { useEffect, useState} from "react"
import axios, { all } from "axios"
import { useRouter } from "next/router"
import { ReviewCard } from "../components/ReviewCard"
import Header from "../components/Header"
const reviews = () => {

    const router = useRouter();

    const [islogin, setLogin] = useState(false)
    const [customer,setCustomer] = useState([])

    

    useEffect(()=>
    {
        

        async function checkSession (){
            axios.defaults.withCredentials = true;
            axios.get("http://localhost:4000/authen/customer").then
            (
              (res)=>{
                console.log("response is->",res.data)
              
                if (res.data["status"]==="accepted")
                {
                  setLogin(true)
                  setCustomer(res.data["session"])
                  console.log("customer seesion->",customer)


                  axios.post(
                    "http://localhost:4000/review/apartment",
                    {
                     "customerId":res.data["session"]["customerId"]
                    }).then(
                        (res2)=>{
                            console.log("reviews",res2.data)
                            setAllApart(res2.data)
                        }
                    ).catch
                    (
                        (err)=>{
                            
                            alert("Error while fetching the data")
                        }
                    )





                }
              }
            ).catch(e=>{console.log(e)})
            }

            checkSession();

    }
    
    
    
    ,[])
    const [allApart, setAllApart] = useState([])

    console.log("all->",allApart)
    
  return (


    
    <div>
      <Header text="Share Your Experince and Help Others to Choose a Better One"/>
          {
          
            allApart[0]?
(
          allApart.map(
            (apart)=>(
               <ReviewCard apart={apart} customerId = {customer["customerId"]}/>
            )
        )
        ):<Header text="No Apartments to Review"/>

        }

    </div>
  )
}

export default reviews