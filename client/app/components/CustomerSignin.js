import { useEffect, useState } from "react"
import {useRouter} from "next/router"
import styles from "../styles/signin.module.css"
import Link from 'next/link'
import axios from "axios"
// const axios = require('axios')



const CustomerSignin = () => {

  const router = useRouter();
const [user_name, setusername] = useState('')
const [password, setpassword] = useState('')





axios.defaults.withCredentials = true;
const form_submiter = async (e)=>{
  e.preventDefault();
// axios.defaults.with




const url = "http://localhost:4000/authen/customer"
const res = await axios.post(url,{
  "customer":{
    "userName":user_name,
    "password":password
  }
})

const json_returned = res.data;
setusername("");
setpassword("");
// console.log(json_returned)

if(json_returned["status"]==="Allowed")
{
  console.log("Acepted")
  router.push("/")
}
else
{
  alert("Invalid Credientials")
  console.log("rejected")

}








}




  return (
    <div className={styles.form_container}>

    <form action="" method="post">
    <h2>
      Enter Your Credientials
    </h2>
        <label htmlFor="username">Email</label>
        <input  style={{ fontSize: "1.3rem",padding:"0 0.8rem", fontWeight:'bold' }}type="email" id="UserName"
        onChange={(e)=>{
          setusername(e.target.value)
        }}
        value = {user_name}
        />
        <br />
        
        <label htmlFor="Password">Password</label>
        <input style={{ fontSize: "1.3rem", padding:"0 0.8rem"}} type="password" id="password"
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}
                value = {password}/>
        <br />
        
   
    </form>

    <div className={styles.btn}>

     
<button type="submit" 
onClick={
  
  (user_name && password)?
          form_submiter:
          ()=>
          {
              alert("Please fill out all the fields")
          }
          

}>Sign In</button>
</div>

<li>
        <Link href="/newcustomer">Don't have a account click here to sign up</Link>
      </li>
    </div>
    

  )
}

export default CustomerSignin