import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "../styles/newHotel.module.css"
import axios from "axios"

const newHotelFrom = ({ manEmail, setAddHotel, setChange }) => {

  const router = useRouter();
  const [hotelName, setName] = useState("")
  const [hotelAddress, setAddress] = useState("")
  const [hotelCity, setCity] = useState("")
  const [hotelEmail, setEmail] = useState("")
  const [hotelPh, setPh] = useState("")
  const [addressId, setAddId] = useState(0)

  const [city, setcity] = useState([])
  const [tarCity, SettarCity] = useState([])
  const [country, setCountry] = useState([])
  const [tarcountry, settarCountry] = useState([])
  const [change, setchange] = useState(false)
  useEffect(
    () => {
      const fetchCountriesFromServer = async () => {

        axios.get(
          "http://localhost:4000/get/countries").then(
            (res) => {
              // console.log(res.data)
              setCountry(res.data)
            }
          ).catch
          (
            (err) => {

              alert("Error while fetching the date")
            }
          )
      }
      fetchCountriesFromServer();
      if (country[0]) {
        fetchCity();
      }

    }, [change]

  )

  const fetchCity = async () => {
    console.log("country->", tarcountry)
    axios.post(
      "http://localhost:4000/get/cities", {
      "country": country
    }
    ).then(
      (res) => {
        // console.log(res.data)
        setcity(res.data)
      }
    ).catch(
      (err) => {
        setcity([])
        alert("Error while fetching the date")
      }
    )

  }

















  const form_submiter = async (e) => {

    e.preventDefault();

    console.log("Register is called-> ", manEmail)

    const x = 0;
    await axios.post
      (

        "http://localhost:4000/register/address",
        {
          "address": hotelAddress,
          "cityId": tarCity,
          "countryId": tarcountry
        }).then(
          (res) => {
            console.log("rsponse is ", res.data);
            x = res.data["addressId"][0]["addressId"]
            console.log("x is ", x);







          }
        ).catch(
          (e) => {
            console.log("error is ", e)
          }
        )





    const res = await axios.post("http://localhost:4000/register/hotel", {

      "wrap":
      {
        "userName": manEmail,
        "Hotel":
        {
          "hotelName": hotelName,
          // "hotelCity":hotelCity, "hotelAddress":hotelAddress
          "addressId": x,

          "hotelEmail": hotelEmail, "hotelLandline": hotelPh
        }
      }

    }

    )

    if (res.status === 200) {

      setName("");
      setAddress("");
      setCity("");
      setEmail("");
      setPh("");

      alert("Registered Successfully")
      setAddHotel(false)
      setChange(true)
    }
    else {
      alert("There was some error. Kindly try again")

    }








    router.push("/manage_hotels")

    // if (json_returned) {
    //   router.push("/registered")
    // }


  }
  console.log(country);

  return (
    <div className={styles.form_container} id="not_blur">
      <h2>
        Register your hotel now!
      </h2>


      <form action="" method="post">

        <label htmlFor="hotelName">Hotel name</label>
        <input style={{ fontSize: "1.1rem", padding: "0 0.8rem" }} type="text" id="hotelName" name="hotelName"
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={hotelName}
        />
        <br />

        <label>         Country</label>
        <select onChange={(e) => {
          if (e.target.value !== "select") {

            settarCountry(e.target.value)
            console.log("counttry->", e.target.value)
            setchange(!change)
          }
          else {
            setCity([])
          }
        }}
        
        style={{ fontSize: "1.1rem", padding: "0 0.8rem" }}
        >
          <option>select</option>

          {country.map(

            (count) => (
              <option value={count["countryId"]}>{count["countryName"]}</option>
            )
          )}
        </select>


        <label>  Country</label>
        <select onChange={(e) => {
          if (e.target.value !== "select") {
            setchange(!change)

            console.log("city value->", e.target.value)
            SettarCity(e.target.value)
            // fetchCustomizedApartments()
          }


        }}
        
        style={{ fontSize: "1.1rem", padding: "0 0.8rem" }}
        >
          <option>select</option>

          {
            city.map(
              (citi) => (
                <option value={citi["cityId"]} >{citi["cityName"]}</option>
              )
            )
          }

        </select>

        <label htmlFor="hotelAddress">Address of your hotel: </label>
        <textarea name="" id="" cols="30" rows="10"   onChange={(e) => {
            setAddress(e.target.value)
          }}
          value={hotelAddress}></textarea>
        
        <br />
        <label htmlFor="email">Email of you hotel office: </label>
        <input style={{ fontSize: "1.1rem", padding: "0 0.8rem" }} type="email" id="email" name="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={hotelEmail} />
        <br />
        <label htmlFor="phone number">Phone Number of your hotel office: </label>
        <input style={{ fontSize: "1.1rem", padding: "0 0.8rem"}} type="text" id="ph" name="phone number"
          onChange={(e) => {
            setPh(e.target.value)
          }}
          value={hotelPh} />
        <br />


        <div className={styles.btn}>
          <button type="submit"
            onClick={

              (hotelEmail && hotelAddress && tarCity && country && hotelPh && hotelName) ?

                (e) => {
                  form_submiter(e)

                }

                :
                () => {
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

export default newHotelFrom