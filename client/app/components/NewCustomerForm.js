import { useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/newuser.module.css"
import Link from "next/link"
import axios from "axios"
const NewCustomerForm = () => {

  const router = useRouter();
  const [first_name, setfName] = useState('')
  const [last_name, setlName] = useState('')
    const [cnic,setCnic] = useState('')
  const [email, setEmail] = useState('')
  const [ph, setPh] = useState('')
  const [password, setPass] = useState('')

  const form_submiter = async (e) => {

    e.preventDefault();
    const newuser = { 
      "firstName":first_name, 
      "lastName":last_name, 
      "userName":email, 
      "contactNo":ph, 
      "password":password,
    "cnic":cnic }


    try{

      const res = await axios.post("http://localhost:4000/register/customer",{
        "customer":newuser
      })
      
      console.log("res is ", res)
      const json_returned = res.data;

      // console.log(json_returned)
      
      if(json_returned["status"]==="Registered Successfully")
      {
        router.push("/customer_signin");
      }
      else
      {
        console.log(res.data)
        let x = res.data["status"] ;
        alert(x)
      }
      
      
      
      }
      catch(err)
      {
        console.log(err)
      }
      

    setfName("");
    setlName("");
    setEmail("");
    setPass("");
    setPh("");
    setCnic("")
    


  }

  return (
    <div className={styles.form_container}>
    <h2>
      Become a Member and Enjoy Discounts
    </h2>

      <form action="" method="post">

        <label htmlFor="first_name">First name</label>
        <input style={{ fontSize: "1.2rem",padding:"0 0.8rem", fontWeight:'bold' }} type="text" id="first_name" name="first"
          onChange={(e) => {
            setfName(e.target.value)
          }}
          value={first_name}
        />
        <br />

        <label htmlFor="last">Last name</label>
        <input style={{ fontSize: "1.2rem",padding:"0 0.8rem", fontWeight:'bold' }} type="text" id="last_name" name="last"
          onChange={(e) => {
            setlName(e.target.value)
          }}
          value={last_name} />
        <br />
        <label htmlFor="email">Email:</label>
        <input style={{ fontSize: "1.2rem",padding:"0 0.8rem", fontWeight:'bold' }}type="email" id="email" name="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={email} />
        <br />
        <label htmlFor="phone number">Phone Number:</label>
        <input style={{ fontSize: "1.2rem",padding:"0 0.8rem", fontWeight:'bold' }} type="number" id="ph" name="phone number"
          onChange={(e) => {
            setPh(e.target.value)
          }}
          value={ph} />
        <br />
        <label htmlFor="phone number">Cnic Number:</label>
        <input style={{ fontSize: "1.2rem",padding:"0 0.8rem", fontWeight:'bold' }} type="number" id="ph" name="phone number"
          onChange={(e) => {
            setCnic(e.target.value)
          }}
          value={cnic} />
        <br />
        <label htmlFor="password">Password:</label>
        <input style={{ fontSize: "1.2rem",padding:"0 0.8rem", fontWeight:'bold' }}type="password" id="password" name="password"
          onChange={(e) => {
            setPass(e.target.value)
          }}
          value={password} />

        <br />

        <div className={styles.btn}>
        <button type="submit" 
        onClick={
          (email && password && first_name && last_name && ph && cnic)?
          form_submiter:
          ()=>
          {
              alert("Please fill out all the fields")
          }
          }
          >Register Now</button>
        </div>
      </form>
      <span></span>

      <li>
        <Link href="/customer_signin">Already have a account click here to sign in</Link>
      </li>
    </div>

  )
}

export default NewCustomerForm