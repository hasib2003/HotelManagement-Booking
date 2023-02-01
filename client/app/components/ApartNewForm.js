import React, { useEffect } from 'react'
import { useState } from "react"
import axios from "axios"
import styles from "../styles/apartmentForm.module.css"

const ApartNewForm = ({ session, addApart, setAdd, hotelId }) => {

    const [Session, setSession] = useState(0)
    const [HotelId, setHotelId] = useState(0)

    useEffect(
        () => {
            setSession(session)
            setHotelId(hotelId)
        }
    )
    const [apartTitle, setTitle] = useState("")
    const [apartDes, setDes] = useState("")
    const [bedroom, setBedroom] = useState("")
    const [kitchen, setKitchen] = useState("")
    const [livingRoom, setLiving] = useState("")
    const [washroom, setWash] = useState("")
    const [drawingRoom, setdrawing] = useState("")
    const [Balcony, setBalcony] = useState("")
    const [diningRoom, setDine] = useState("")
    const [tvLounge, setTvlounge] = useState("")
    const [star, setStar] = useState("")
    const [total, setTotal] = useState("")



    const [price, setPrice] = useState()


    const form_submiter = async (e) => {
        e.preventDefault();
        if (confirm("are you sure to make changes")) {
            const updateApart =
            {
                "apartmentTitle": apartTitle,
                "apartmentDesc": apartDes,
                "totalApartments": total,
                "availableApartments": total,
                "bedroom": bedroom,
                "kitchen": kitchen,
                "washroom": washroom,
                "tvLounge": tvLounge,
                "livingRoom": livingRoom,
                "diningRoom": diningRoom,
                "balcony": Balcony,
                "star": star,
                "priceOfRoom": price
            }

            console.log("session", session)


            axios.post("http://localhost:4000/register/apartment", {

                "ManagerId": Session,
                "OwnerId": Session,
                "HotelId": HotelId,
                "Apartment": updateApart
            }

            ).then(
                (res) => {
                    if (res.status === 200) {

                        setBalcony(null);
                        setBedroom(null);
                        setDes(null);
                        setDine(null);
                        setKitchen(null);
                        setLiving(null);
                        setPrice(null);
                        setStar(null);
                        setTitle(null);
                        setTotal(null);
                        setTvlounge(null);

                        alert("Registered Successfully")
                        setAdd(false)
                    }
                    else {
                        alert("There was some error. Kindly try again")

                    }
                }
            )


        }

    }



    console.log("inside new form ownerId", session)
    return (
        <div className={styles.form_container} id="not_blur">
            <h2>
                Add new Apartment and Attract Customers
            </h2>


            <form action="" method="post">

                <label htmlFor="">Apartment title</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="text" id="first_name" name="first"
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    value={apartTitle}
                />
                <br />
                <label htmlFor="rent per night">Rent per Night :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    value={price} />

                <br />
                <label htmlFor="">Description</label>

                <textarea name="" id="" cols="30" rows="10" onChange={(e) => {
                    setDes(e.target.value)
                }}
                    value={apartDes} ></textarea>



                <br />
                <label >No of Bedrooms :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setBedroom(e.target.value)
                    }}
                    value={bedroom} />

                <br />
                <label >No of Kitchen :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setKitchen(e.target.value)
                    }}
                    value={kitchen} />

                <br />
                <label htmlFor="washroom no">No of Washroom :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setWash(e.target.value)
                    }}
                    value={washroom} />
                <br />
                <label >No of living rooms :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setLiving(e.target.value)
                    }}
                    value={livingRoom} />
                <br />
                <label >Dining Room :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setDine(e.target.value)
                    }}
                    value={diningRoom} />
                <br />
                <label >No of drawing rooms :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setdrawing(e.target.value)
                    }}
                    value={drawingRoom} />
                <br />

                <br />
                <label>Tv Lounge :</label>
                <input style={{ fontSize: "1.2rem", padding: "0 0.8rem" }} type="number"
                    onChange={(e) => {
                        setTvlounge(e.target.value)
                    }}
                    value={tvLounge} />
                <br />


                <br />
                <label >Balcony :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setBalcony(e.target.value)
                    }}
                    value={Balcony} />

                <br />
                <label >Star Rating :</label>
                <select name="" id="" onChange={(e) => {
                    setStar(e.target.value)
                }}>

                    <option value="-1">Select</option>
                    <option value="3">3-Star</option>
                    <option value="4">4-Star</option>
                    <option value="5">5-Star</option>
                </select>




                {/* <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="text"
                   
                    value={star} /> */}
                <br />
                <label >Total Aparatments of this type :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setTotal(e.target.value)
                    }}
                    value={total} />
                <br />






                <div className={styles.btn}>
                    <button type="submit"
                        onClick={
                            (apartTitle && apartDes && bedroom &&
                                kitchen && livingRoom && diningRoom && tvLounge &&
                                price && Balcony && washroom && star && total && drawingRoom) ?

                                (e) => {

                                    form_submiter(e)

                                } :

                                (e) => {
                                    alert("Please fill out all the fields")
                                    e.preventDefault()
                                }

                        }
                    >Register Apartment</button>
                </div>
            </form>
        </div>
    )
}


export default ApartNewForm







