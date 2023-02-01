import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/signin.module.css"
import Link from 'next/link'
import axios from "axios"
// const axios = require('axios')



const SigninForm = ({ isLogin, setLogin, heading }) => {

  const [user_name, setusername] = useState('')
  const [password, setpassword] = useState('')





  axios.defaults.withCredentials = true;
  const form_submiter = async (e) => {
    e.preventDefault();


    try {
      const url = ""
      if (heading === "Sign in as Manager") {
        url = "http://localhost:4000/authen/manager"
      }
      else if (heading === "Sign in as Owner") {
        url = "http://localhost:4000/authen/owner"
      }



      const res = await axios.post(url, {
        "credientials": {
          "userName": user_name,
          "password": password
        }
      })

      console.log("res is ", res)
      const json_returned = res.data;
      setusername("");
      setpassword("");
      // console.log(json_returned)

      if (json_returned["status"] === "accepted") {
        setLogin(true);
      }
      else {
        alert("Invalid Credientials")
      }



    }
    catch (err) {
      console.log(err)
    }





  }




  return (
    <div className={styles.form_container}>

      <form action="" method="post">
        <h2>
          {heading}
        </h2>
        <label htmlFor="username">Email</label>
        <input style={{ fontSize: "1.5rem", padding: "1rem 0.8rem", fontWeight: 'bold' }} type="email" id="UserName"
          onChange={(e) => {
            setusername(e.target.value)
          }}
          value={user_name}
        />
        <br />

        <label htmlFor="Password">Password</label>
        <input style={{ fontSize: "1.8rem", padding: "1rem 0.8rem" }} type="password" id="password"
          onChange={(e) => {
            setpassword(e.target.value)
          }}
          value={password} />
        <br />


      </form>

      <div className={styles.btn}>


        <button type="submit"
          onClick={

            (user_name && password) ?
              form_submiter :
              () => {
                alert("Please fill out all the fields")
              }


          }>Sign In</button>
      </div>

      <li>
        <Link href="/newuser">Don't have a account click here to sign up</Link>
      </li>
    </div>


  )
}

export default SigninForm