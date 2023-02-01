import { useState,useEffect } from 'react'
import SigninForm from '../components/SigninFrom'
import styles from "../styles/signin.module.css"
import axios from "axios"
import {useRouter} from "next/router"
const manager_signin = () => {

    const  router = useRouter();
    
      
    
    const [islogIn, setlogin] = useState(false)
    
    axios.defaults.withCredentials = true;
    useEffect(
      ()=>{
    console.log("useess")
    
        async function checkSession (){
        axios.get("http://localhost:4000/authen/manager").then
        (
          (res)=>{
          
            if (res.data["status"]==="accepted")
            {
              setlogin(true)
              router.push("/dashboard")
            }
          }
        ).catch(e=>{console.log(e)})
        }
    
        checkSession();
      },[islogIn]
    )
    
      return (
        <>
    
        <div className={styles.container}>
                <SigninForm islogIn = {islogIn} setLogin = {setlogin} heading={"Sign in as Manager"}/>
          
        </div>
        </>
      )



















}

export default manager_signin