import React from 'react'
import styles from "../styles/dashboard.module.css"
import Link from 'next/link'
import Image from 'next/image'

import axios from "axios"
import { useRouter } from 'next/router'
const SideBar = ({ownerEmail, ownerName, ownerPh}) => {

  const router = useRouter();
  return (
    <div className={styles.sidebar}>


      <div className={styles.userInfo}>

      <div className={styles.ownerImage}>
        <Image src="/../public/avatar.png" alt = "your picture here" height={300} width={300}></Image>
        </div>

      </div>

        <div className={styles.mainCont}>
          <h2>
            {ownerName}
          </h2>
          <h2>
            {ownerEmail}
          </h2>
          <h2>
           {ownerPh}
          </h2>
        </div>




      <div className={styles.mainLinks}>

      

      <Link href="/manage_hotels">
        <h2>
        Your Hotels    
        </h2> 
      </Link>
      <Link href="/assign_managers">
        <h2>
        Assign Managers    
        </h2> 
      </Link>
      <Link href="/config_manager">
        <h2>
          Add or Remove Manager
        </h2> 
      </Link>
      <Link href="/reports">
        <h2>
        See Bookings     
        </h2> 
      </Link>
      <Link href="#">
        <h2>
        Team Support     
        </h2> 
      </Link>

      <button onClick={
        ()=>{
        axios.delete("http://localhost:4000/authen/owner").then
        (
          (res)=>{
            console.log("response is->",res.data)
          
            if (res.data["status"]==="logged out")
            {    
              router.push("/owner_signin")
            }
          }
        ).catch(e=>{console.log(e)})
      }
    }>
        Log out
      </button>


    </div>
    </div>
  )
}

export default SideBar