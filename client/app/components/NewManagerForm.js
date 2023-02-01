import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/newHotel.module.css"
import axios from "axios"


export const NewManagerForm = ({OwnerId}) => {
    const router = useRouter();
    const [firstName, setFirst] = useState("")
    const [lastName, setLast] = useState("")
    const [password, setPassword] = useState("")
    const [manageEmail, setEmail] = useState("")
    const [managerPh, setPh] = useState("")
    const [user, setUser] = useState("")

    // useEffect(
    //     ()=>{
    //         setUser(userName)
    //     },[userName]
    // )
  
    const form_submiter = async (e) => {
  
      e.preventDefault();

    //   const Manager = 
    console.log(OwnerId)


        axios.post(
            "http://localhost:4000/register/manager",
            {
            "userName":OwnerId,
            "Manager":
            { 
                "firstName":firstName,
                "lastName":lastName,
                "userName":manageEmail,
                "contactNo":managerPh,
                "password":password
            }
            }
        ).then(
            (res)=>{
                if(res.status === 200){

  
                    setFirst("");
                    setLast("");
                    setPassword("");
                    setEmail("");
                    setPh("");
              
                    alert("Registered Successfully")
                   
                  }
            }
        ).catch(
            (err)=>{
                alert(err.body)
            }
        )

        }
    
   
 

    


        

  
      
  
  
      
      
    
  
  
  
//   router.push("/dashboard")
  
      // if (json_returned) {
      //   router.push("/registered")
      // }
  
  
    
  
    return (
      <div className={styles.form_container} id="not_blur">
      <h2>
        Add a Manager for your Hotel
        </h2>
  
  
        <form action="" method="post">
  
          <label>First name</label>
          <input style={{ fontSize: "1.8rem",padding:"0 0.8rem", fontWeight:'bold' }} type="text"
            onChange={(e) => {
              setFirst(e.target.value)
            }}
            value={firstName}
          />
          <br />
  
          <label>last Name </label>
          <input style={{ fontSize: "1.8rem",padding:"0 0.8rem", fontWeight:'bold' }} type="text" 
            onChange={(e) => {
              setLast(e.target.value)
            }}
            value={lastName} />
          <br />
  
          <label >Email </label>
          <input style={{ fontSize: "1.8rem",padding:"0 0.8rem", fontWeight:'bold' }} type="email" 
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={manageEmail} />
          <br />
          <label >Password</label>
          <input style={{ fontSize: "1.8rem",padding:"0 0.8rem", fontWeight:'bold' }}type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password} />
          <br />
          <label >Phone Number </label>
          <input style={{ fontSize: "1.8rem",padding:"0 0.8rem", fontWeight:'bold' }} type="text" 
            onChange={(e) => {
              setPh(e.target.value)
            }}
            value={managerPh} />
          <br />
  
  
          <div className={styles.btn}>
          <button type="submit" 
          onClick={
      
            (firstName && lastName && manageEmail && managerPh && password)?
            
            (e)=>{
              form_submiter(e)
  
            }
           
            :
            ()=>
            {
                alert("Please fill out all the fields")
            }
            }
            >Register Now</button>
          </div>
        </form>
        <span></span>
      </div>
  
    )
        }
