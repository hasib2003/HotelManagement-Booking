import { useState,useEffect } from "react"
import SideBar from "../components/SideBar"
import DisplayCard from "../components/DisplayCard"
import styles from "../styles/dashboard.module.css"
import Header from "../components/Header"
import axios from "axios"
import { useRouter } from "next/router"


const apartment = ({hotelId}) => {


const Router = useRouter();
const [Session,setSession] = useState(null);
const [isEdit,setEdit] = useState(false)


// owner id shall be used to fetch the information regarding the hotels registered

// const fetchSpecs = async (ownerId) =>
// {
//     console.log("a fetch request with hotelId ",{ownerId})
// }



useEffect (()=>{
    // fetchSpecs(null);
    const fetchFromServer = async ()=>
        {
            axios.get("http://localhost:4000/authen/owner").then(
                (res)=>
                {
                    if (res.data["status"]==="accepted")
                    {
                    // const session = res.data["session"]
                    setSession(res.data.session["ownerId"])

                    console.log("Session->",Session)
                    console.log("prop id->",hotelId)
                      // setName(session["firstName"]+" "+session["lastName"])
                      // setEmail(session["userName"])
                      // setPh(session["contactNo"])

                    axios.post("http://localhost:4000/get/apartment",
                    {
                     
                      "MangerId":res.data.session["ownerId"],
                      "OwnerId":res.data.session["ownerId"],
                      "HotelId": hotelId
                    
                      
                    }
                    ).then(
                      (res)=>{
                          setApartment(res.data)

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


const deleteApartment = (targetApartment)=>
{
  if
  (confirm("The selected department shall be deleted"))
  {

    axios.delete("http://localhost:4000/delete/apartment",
    {
      data:{
        "apartmentId":targetApartment["appartmentId"],
        "OwnerId":Session,
        "ManagerId":Session
      }
    }).then(
      (res)=>{
        console.log(res)
        alert(res.data.status)
      }
    ).catch(
      (err)=>{
        alert(err.body)
      }
    )
  setApartment(
    (allApartment.filter(
        (apart)=>{
            return apart.apartmentId!=targetApartment.apartmentId
        }
    ))
  )
    console.log(apartment);
      }
}


const editApartment = (apartment)=>
{
  if(apartment){
  //for now
console.log(`changing the datebase`)
// in full stack a request to the backend

console.log(`tartget id => ${apartment.apartmentId}`)
setApartment(
  (allApartment.filter(
      (apart)=>{
          return apart.apartmentId!=apartment.apartmentId
      }
  ))
)
setApartment(
      [...allApartment,apartment]
  )
  console.log(allApartment)
  }
}

const addToMain=(apart)=>{
  setApartment(
    [...allApartment,apart]
  )

}







const [allApartment, setApartment] = useState([] );
  return (

    // state of all current hotels

    <div className={
      
      styles.main_container}>
        {/* <SideBar/> */}
        
        <div 
        className={styles.content_container}
        >
                  
        

        <Header text={"Manage your Aparatments here"}/>
        <DisplayCard 
        hotelId = {hotelId}
        session ={Session}
        deleteObject={deleteApartment}
        editObject ={editApartment}
        edit = {isEdit}
        setEdit = {setEdit}
        cardList={allApartment           
        }
        isHotel={false}
        addToMain={addToMain}
        />
        </div>



    </div>
  )
}
apartment.getInitialProps = async ({ query }) => {
  const {hotelId} = query

  return {hotelId}
}

export default apartment
