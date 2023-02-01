import { useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/newHotel.module.css"
import Link from "next/link"
const HotelForm = ({ hotel, setEditLocal, editLocal }) => {

  const router = useRouter();
  const [hotelName, setName] = useState(hotel.name)
  const [hotelAddress, setAddress] = useState(hotel.city)
  const [hotelCity, setCity] = useState(hotel.address)
  const [hotelEmail, setEmail] = useState(hotel.emaiaddressl)
  const [hotelPh, setPh] = useState(hotel.ph)


  const [city, setcity] = useState([])
  const [tarCity, SettarCity] = useState([])
  const [country, setCountry] = useState([])
  const [tarcountry, settarCountry] = useState([])
  const [change, setChange] = useState(false)
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
    const newHotel = { hotelName, hotelCity, hotelAddress, hotelEmail, hotelPh }


   


    setEditLocal(!editLocal);




  }

  return (
    <div className={styles.form_container} id="not_blur">
      <h2>
        Register your hotel now!
      </h2>


      <form action="" method="post">

        <label htmlFor="hotelName">Hotel name</label>
        <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="text" id="hotelName" name="hotelName"
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={hotelName}
        />
        <br />
        <h2>
          Country
        </h2>
        <select onChange={(e) => {
          if (e.target.value !== "select") {
            settarCountry(e.target.value)
            setChange(!change)
          }
          else {
            setCity([])
          }
        }}>
          <option>select</option>

          {country.map(

            (count) => (
              <option value={count["countryName"]}>{count["countryName"]}</option>
            )
          )}
        </select>


        <br />

        <h2>
          City
        </h2>
        <select onChange={(e) => {
          if (e.target.value !== "select") {
            setChange(!change)

            console.log("city value->", e.target.value)
            SettarCity(e.target.value)
            // fetchCustomizedApartments()
          }


        }}>
          <option>select</option>

          {
            city.map(
              (citi) => (
                <option value={citi["cityName"]} >{citi["cityName"]}</option>
              )
            )
          }

        </select>

        <label htmlFor="hotelAddress">Address of your hotel: </label>
        <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="text" id="hotelAddress" name="hotelAddress"
          onChange={(e) => {
            setAddress(e.target.value)
          }}
          value={hotelAddress} />
        <br />
        <label htmlFor="email">Email of you hotel office: </label>
        <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="email" id="email" name="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={hotelEmail} />
        <br />
        <label htmlFor="phone number">Phone Number of your hotel office: </label>
        <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="text" id="ph" name="phone number"
          onChange={(e) => {
            setPh(e.target.value)
          }}
          value={hotelPh} />
        <br />


        <div className={styles.btn}>
          <button type="submit"
            onClick={
              (hotelEmail && hotelAddress && country&&tarCity && hotelPh && hotelName) ?
                form_submiter():
                () => {
                  alert("Please fill out all the fields")
                }
            }
          >Register </button>
        </div>
      </form>
      <span></span>
    </div>

  )
}

export default HotelForm