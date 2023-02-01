import { useState, useEffect } from "react"
import SideBar from "../components/SideBar"
import styles from "../styles/dashboard.module.css"
import Header from "../components/Header"
import axios from "axios"

import { useRouter } from "next/router"
const dashboard = ({ session }) => {




    const Router = useRouter()

    useEffect(
        () => {

            const fetchFromServer = async () => {
                axios.get("http://localhost:4000/authen/owner").then(
                    (res) => {
                        if (res.data["status"] === "accepted") {
                            const session = res.data["session"]
                            setName(session["firstName"] + " " + session["lastName"])
                            setEmail(session["userName"])
                            setPh(session["contactNo"])
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





    const [ownerName, setName] = useState(null)
    const [ownerEmail, setEmail] = useState(null)
    const [ownerPh, setPh] = useState(null)


    return (


        <div className={styles.main_container}>
            <SideBar ownerEmail={ownerEmail} ownerName={ownerName} ownerPh={ownerPh} />
            <div className={styles.content_container}>

                <Header text={"Dashboard"} />
                
                <div className={styles.home}>

                
                    <h1>
                        Welcome back
                    </h1>
                    <h2>
                        Now you can manage all of your hotels at one place
                    </h2>
</div>
            </div>
        </div>
    )
}

export default dashboard