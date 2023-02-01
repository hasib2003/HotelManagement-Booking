import { useState,useEffect } from "react"
import SideBar from "../components/SideBar"
import DisplayCard from "../components/DisplayCard"
import styles from "../styles/dashboard.module.css"
import Header from "../components/Header"
import axios from "axios"
import { useRouter } from "next/router"

import Link from "next/link";

const manage_hotels = () => {

const Router = useRouter()
  useEffect(
    ()=>
    {
      

        const fetchFromServer = async ()=>
        {
            axios.get("http://localhost:4000/authen/owner").then(
                (res)=>
                {
                    if (res.data["status"]==="accepted")
                    {
                    const session = res.data["session"]
                      setName(session["firstName"]+" "+session["lastName"])
                      setEmail(session["userName"])
                      setPh(session["contactNo"])

                    axios.post("http://localhost:4000/get/allHotel",
                    {
                      "userName": session["userName"]
                      
                    }
                    ).then(
                      (res)=>{
                          setHotels(res.data)

                       }
                    ).catch(
                      (err)=>{
                        console.log(err)
                      }
                    )


                    }
                    else
                    {
                        Router.push("/dashboard")

                    }
                }
            )
        }
        fetchFromServer();
    

    },[]
)



// owner id shall be used to fetch the information regarding the hotels registered


// removing a hotel from the list

const deleteHotel = (targetHotel)=>
{


  const deleteFromServer = async ()=>{
    axios.delete("http://localhost:4000/delete/hotel",
    {
      data:{
      "ownerEmail":ownerEmail,
      "hotelId":targetHotel.hotelId
      }
    }).then
    (
      (res)=>{
        console.log(res)
        if (res.status === 200)
        {
          alert(res.data["status"])
        }
      }
    ).catch(
      (err)=>{
        console.log(err)
        alert(err.body)
      }
    )


  }

  console.log("delete request on hotel with id",targetHotel.hotelId)


if(confirm("Do you confirm to delete the hotel"))
{
  deleteFromServer();
  setHotels(
    allHotels.filter(
      (hotel)=>{
        return hotel.hotelId!=targetHotel.hotelId
      }
    )
  )
}


}


const editHotel = (card)=>{
  console.log("a edit function called on :")
  console.log(card);

}

const [change , setChange] = useState(false)
const [allHotels, setHotels] = useState(null)


const [editGlobally, setEGlobal] = useState(false)


const [ownerName,setName] = useState(null)
const [ownerEmail,setEmail] = useState(null)
const [ownerPh,setPh] = useState(null)


  return (

    // state of all current hotels

    <div className={styles.main_container }>
 <SideBar ownerEmail = {ownerEmail}  ownerName = {ownerName} ownerPh={ownerPh}/>        <div className={styles.content_container}>

        <Header text={"Your All Hotels"}/>
        <DisplayCard 
        deleteObject = {deleteHotel}
        editObject = {editHotel}
        edit = {editGlobally}
        setEdit = {setEGlobal}
        cardList={allHotels}
        isHotel={true}
        owner_manEmail = {ownerEmail}
        setChange = {setChange}
        />
        </div>
    </div>
  )
}

export default manage_hotels