import { useState,useEffect} from "react"
import { BookingRecord } from "../components/BookingRecord"
import Header from "../components/Header"

import styles from "../styles/managerCard.module.css"
import axios from "axios";
import {useRouter} from "next/router"

const reports = () => {
    const Router = useRouter()

    // const [session,setSession] = useState(null)
        useEffect(
        () => {
            setRecord([])
            const fetchFromServer = async () => {
                axios.get("http://localhost:4000/authen/owner").then(
                    (res) => {
                        if (res.data["status"] === "accepted") {
                            const session = res.data["session"]
                            // setSession(session["userName"]);

                            axios.post("http://localhost:4000/records/owner",
                                {
                                    "owner": session["userName"]


                                }
                            ).then(
                                (res) => {
                                    console.log(res.data["records"])
                                    setRecord(res.data["records"])
                                }
                            ).catch(
                                (err) => {
                                    console.log(err)
                                }
                            )




                        }
                        else {
                            Router.push("/owner_signin")

                        }
                    }
                )
            }
            fetchFromServer();
        }, []
    )

    const [records, setRecord] = useState([])
    return (


   
<>           
<Header text={"Sales from your Hotels"} />


            <div className={styles.main2}>
                {         
                records[0]?  
                records.map(
                    (record)=>
                    (   
                        <BookingRecord record={record}/>
                    )
                ):
                <Header text ="Sorry no sales Yet"/>
                }

            </div>

            </>


    )
}

export default reports