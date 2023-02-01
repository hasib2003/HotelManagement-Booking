
import Booking from '../components/Booking'
import ApartmentUser from '../components/ApartmentUser'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import styles from "../styles/Home.module.css"
import { useRouter } from 'next/router'
export default function Home() {

  const [islogin, setLogin] = useState(false)

  const [allApart, setAllApart] = useState([])
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [customer, setCustomer] = useState([])
  const router = useRouter();
  useEffect(
    () => {

      const fetchFromServer = async () => {

        axios.get(
          "http://localhost:4000/get/apartment").then(
            (res) => {
              // console.log(res.data)
              setAllApart(res.data)
            }
          ).catch
          (
            (err) => {

              alert("Error while fetching the date")
            }
          )



        // check for sessions
      }
      axios.defaults.withCredentials = true;

      async function checkSession() {
        axios.get("http://localhost:4000/authen/customer").then
          (
            (res) => {
              console.log("response is->", res.data)

              if (res.data["status"] === "accepted") {
                setLogin(true)
                setCustomer(res.data["session"])

                router.push("/")
              }
            }
          ).catch(e => { console.log(e) })
      }


      fetchFromServer();
      checkSession();

      // if(country[0])
      // {
      //     fetchCity();
      // }

    }, [islogin]

  )






  return (
    <div className={styles.app}>
      




      <Booking setApart={setAllApart} checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} />
      
      <section className={styles.mainBody}>
        <div className={styles.userInfo}>

     
      {!islogin ?
        <div className={styles.loginInfo}>
          <h2>
            Already registered as Customer?
          </h2>
          <Link href="/customer_signin"> Customer SignIn
          </Link>

          <h2>
          Registered Now as Customer?
          </h2>
          <Link href="/customer_signin"> Register here
          </Link>



          <h2>
            Already registered as Owner?
          </h2>

          <Link href="/owner_signin"> Owner SignIn
          </Link>


          <h2>
          Registered Now as Owner?
          </h2>
          <Link href="/customer_signin"> Register here
          </Link>
        </div>
        :
        <div className={styles.loginInfo}>
          <h3>
          {customer["firstName"] + customer["lastName"]}
          </h3>
          <h3>
            {customer["userName"]}
          </h3>
          <h3>
            {customer["cnic"]}
          </h3>
          
          <div className={styles.btn}>

          
          <button onClick={() => {
            router.push("/reviews")
          }}>
            Pending Reviews
          </button>

          <button onClick={
            () => {
              axios.delete("http://localhost:4000/authen/customer").then
                (
                  (res) => {
                    console.log("response is->", res.data)

                    if (res.data["status"] === "logged out") {
                      setLogin(false)

                      router.push("/")
                    }
                  }
                ).catch(e => { console.log(e) })
            }
          }>
            Log out
          </button>
          </div>

        </div>
      }
         </div>

      <ApartmentUser checkIn={checkIn} checkOut={checkOut} apartment={allApart} />
      </section>



    </div>
  )
}
