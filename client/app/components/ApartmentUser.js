
import { useState } from "react"
import styles from "../styles/Home.module.css"
import Header from "./Header"
import UserCard from "./UserCard"
const ApartmentUser = ({apartment, checkIn, checkOut}) => {


  return (
    <div className = {styles.mainApart}>
        {apartment[0]?
        
        apartment.map(
            (apart)=>(
                <UserCard  checkIn = {checkIn} checkOut = {checkOut} apart ={apart}/>
                
            )
        )
      :
     < Header text="No machning Hotels, try changning City Name"/>
      }
    </div>
  )
}

export default ApartmentUser