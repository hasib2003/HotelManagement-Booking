import styles from "../styles/managerCard.module.css"
import axios from "axios"
// import { useEffect, useState } from "react"

export const ConfigManagerCard = ({manager,sessionUser}) => {
  return (
    <div className={styles.card}>

    <div className={styles.textBar}>
        <h1>
            {manager["firstName"] +" "+ manager['lastName']}
        </h1>
        <h3>
            {manager["userName"]}
            </h3>

    </div>

    <div className={styles.editBar}>
        
        <div className={styles.btn}>
            <button  onClick = 
            {
                ()=>
                {
                    const remover = async ()=>{
                        axios.patch("http://localhost:4000/update/manager",
                        {
                            wrap: {
                                "OwnerUserName": sessionUser,
                                "Manager": manager["managerId"],

                              }
                        }).then(
                            (res)=>{
                                console.log(res)

                                    axios.delete("http://localhost:4000/delete/manager",
                                    {
                                        data:{
                                            "OwnerUserName": sessionUser,
                                            "Manager": manager["managerId"],
                                        }
                                    }
                                    ).then
                                    (
                                        (res)=>
                                        {
                                            alert(res.data);
                                        }
                                    ).catch(
                                        (err)=>{
                                            alert(err)
                                        }
                                    )


                            }
                        ).catch(
                            (err)=>{
                                console.log(err)
                            }
                        )


                    }  

                    remover();

                }
            }>Delete Manager</button>
        </div>

    </div>


</div>
  )
}
