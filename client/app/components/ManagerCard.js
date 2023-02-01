import styles from "../styles/managerCard.module.css"
import DropDown from "../components/DropDown"
import { useEffect, useState } from "react"
import axios from "axios"
const ManagerCard = ({ manager, freeHotel, sessionUser }) => {
    const [hotelName,setHotel] = useState("-- no hotel assigned --")

    useEffect(

        ()=>{
            {manager["hotelName"]?
            setHotel(manager["hotelName"]):null
        
            }
        }
    )

    return (

   

        <div className={styles.card}>

            <div className={styles.textBar}>
                <h1>
                    {manager["firstName"] +" "+ manager["lastName"]}
                </h1>
                <h3>
                    {manager["userName"]}
                    </h3>

            </div>
            <div className={styles.textBar}>
                <h2>
                {hotelName}
                </h2>
            </div>
            <div className={styles.editBar}>
                {hotelName !=="-- no hotel assigned --"?

                
                <div className={styles.btn}>
                    <button  onClick = 
                    {
                        ()=>{
                            const unlinker = async ()=>
                            {
                                console.log("unlinkeer called")
                                axios.patch("http://localhost:4000/update/manager",
                                {
                                    wrap: {
                                        "OwnerUserName": sessionUser,
                                        "Manager": manager["managerId"],

                                      }
                                }).then(
                                    (res)=>{
                                        console.log(res)
                                    }
                                ).catch(
                                    (err)=>{
                                        console.log(err)
                                    }
                                )
                            }
                            unlinker();
                        }
                    }>Unlink Manager</button>
                </div>
                :null}

                <div className="dropDown">
                    <DropDown freeHotel = {freeHotel} managerId = {manager["managerId"]} sessionUser = {sessionUser}/>
                </div>
            </div>


        </div>



            )
        
    
    
}

export default ManagerCard