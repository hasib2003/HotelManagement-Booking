
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import ManagerCard from "../components/ManagerCard"
import styles from "../styles/managerCard.module.css"
const services = () => {
const Router = useRouter();
    useEffect(
        () => {
            const fetchFromServer = async () => {
                axios.get("http://localhost:4000/authen/owner").then(
                    (res) => {
                        if (res.data["status"] === "accepted") {
                            const session = res.data["session"]
                            setSession(session["userName"]);

                            axios.post("http://localhost:4000/get/managers",
                                {
                                    "userName": session["userName"]
                                   

                                }
                            ).then(
                                (res) => {
                                    console.log(res.data)
                                    setManagers(res.data)



                                    axios.post("http://localhost:4000/get/hotel/no/manager",
                                {
                                    "userName": session["userName"]

                                }
                            ).then(
                                (res2) => {
                                    setFreeHotel(res2.data)

                                }
                            ).catch(
                                (err) => {
                                    console.log(err)
                                }
                            )

                                }
                            ).catch(
                                (err) => {
                                    console.log(err)
                                }
                            )
                            



                        }
                        else {
                            Router.push("/signin")

                        }
                    }
                )
            }
            fetchFromServer();
        }
    ,[])


    const [allManager, setManagers] = useState([])
    const [freeHotel, setFreeHotel] = useState([])
    const [sessionUser,setSession] = useState("")
    console.log("allmanger->",allManager)
    console.log("vacacnhotel->",freeHotel)
    return (
        <div className={styles.mainContainer}>
            
            {

            allManager.map(
                (manager)=>(
                    <ManagerCard manager={manager} freeHotel  ={freeHotel} sessionUser = {sessionUser}/>     

                )
            )}  
        
        </div>
    )
}

export default services