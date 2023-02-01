import { useEffect, useState } from "react"
import { ConfigManagerCard } from "../components/ConfigManagerCard"
import styles from "../styles/managerCard.module.css"
import axios from "axios"
import { useRouter } from "next/router"
import { NewManagerForm } from "../components/NewManagerForm"
import Header from "../components/Header"
const config_manager = () => {
    const Router = useRouter()

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

    const [allManager, setManagers] = useState([])
    const [sessionUser, setSession] = useState("")
    const [open, setOpen] = useState(true)
    return (
        <div className={styles.main2}>
          
            {
                allManager[0] ?
                    allManager.map(
                        (manager) => (<ConfigManagerCard manager={manager} sessionUser={sessionUser} />
                        )
                    ) :
                    <Header text="No Manager Registered Yet" />
            }
              <div className={styles.btn}>
                {

                    open ? <button onClick={
                        () => {
                            setOpen(!open)
                        }
                    }>
                        Register More
                    </button> :
                        <>
                            <button onClick={
                                () => {
                                    setOpen(!open)
                                }
                            }>
                                Close
                            </button>
                            <div className="NewManager">
                                <NewManagerForm OwnerId={sessionUser} />

                            </div>
                        </>

                }
            </div>

        </div>
    )
}

export default config_manager