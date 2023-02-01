import styles from "../styles/managerCard.module.css"
import axios from "axios"
import { useEffect } from "react"
// import { useEffect, useState } from "react"

export const BookingRecord = ({record}) => {

    console.log(record)

  return (
    <div className={styles.card}>

    <div className={styles.textBar}>


        
        <h2>
            <i>
        Customer</i>
        </h2>
        <h2>
        Name: {record["firstName"]}
        </h2>
        <h3>
            Email:{record["bookingEmail"]}
            </h3>
        <h3>
            Cnic:{record["cnic"]}
            </h3>

    </div>

    <div className={styles.textBar}>
        
            <h2>
            <i> Apartment</i>
            </h2>
            <h2>

            
            Hotel Name: {record["hotelName"]}
            </h2>
     
        <h3>
            Apartment: {record["AppartmentTitle"]}
            </h3>
        <h3>
            Time: {record["bookingTime"]}
            </h3>


    </div>
    <div className={styles.textBar}>
    <h2>
    <i> Bill</i>
    </h2>
    <h3>
            Total: {record["totalPrice"]}
            </h3>
            </div>

 


</div>
  )
}
