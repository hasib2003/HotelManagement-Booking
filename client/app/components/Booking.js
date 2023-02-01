import styles from "../styles/Home.module.css"
import Image from 'next/image'
import axios from "axios"
import { useEffect, useState } from "react"

const Booking = ({ setApart, checkIn, checkOut, setCheckIn, setCheckOut }) => {

    const [city, setCity] = useState([])
    const [tarCity, SettarCity] = useState([])
    const [country, setCountry] = useState([])
    const [tarcountry, settarCountry] = useState([])
    const [change, setChange] = useState(false)
    useEffect(
        () => {
            const fetchFromServer = async () => {

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
            fetchFromServer();
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
                setCity(res.data)
            }
        ).catch(
            (err) => {
                setCity([])
                alert("Error while fetching the date")
            }
        )

    }

    const fetchCustomizedApartments = async () => {
        axios.post(
            "http://localhost:4000/get/reqd/apartments",
            {
                "cityName": tarCity
            }
        ).then(
            (res) => {
                console.log(res.data)
                setApart(res.data)
            }
        ).catch
            (
                (err) => {

                    alert("Error while fetching the date")
                }
            )
    }

    return (



        <div className={styles.booking_container}>
            <div className={styles.mainHead}>


                <h1>
                    LET US FIND THE BEST PLACE FOR YOU
                </h1>

            </div>
            <div className={styles.booker}>


                <div className={styles.bookingSpecs}>

                    <div className={styles.date}>
                        <h2>
                            Check In
                        </h2>
                        <input value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} type="date" min={new Date()} />
                    </div>

                    <div className={styles.date}>
                        <h2>
                            Check Out
                        </h2>
                        <input value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} type="date" />
                    </div>

                    <div className={styles.place}>
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
                                    <option value={count["countryId"]}>{count["countryName"]}</option>
                                )
                            )}
                        </select>                    </div>

                    <div className={styles.place}>
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
                                        <option value={citi["cityId"]} >{citi["cityName"]}</option>
                                    )
                                )
                            }

                        </select>
                    </div>



                    <div className={styles.search}>

                        <button onClick={() => {


                            (checkIn && checkOut && tarcountry && city) ?
                                fetchCustomizedApartments() : alert("kindly fill all fields")

                            console.log(checkIn, checkOut)


                        }}>
                            Find
                        </button>
                    </div>
                </div>



            </div>



        </div>
    )
}

export default Booking