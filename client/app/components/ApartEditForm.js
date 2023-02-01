import React from 'react'
import { useState } from "react"

import styles from "../styles/newuser.module.css"

const ApartEditForm = ({ apartment, setEdit, editFunc, seteditApart }) => {


    const [apartTitle, setTitle] = useState(apartment.apartmentTitle)
    const [apartDes, setDes] = useState(apartment.desc)

    const [bedroom, setBedroom] = useState(apartment.bedRoom)
    const [livingRoom, setLiving] = useState(apartment.livingRoom)
    const [washroom, setWash] = useState(apartment.washroom)
    const [drawingRoom, setdrawing] = useState(apartment.drawingRoom)
    const [diningRoom, setDine] = useState(apartment.diningRoom)

    const [price, setPrice] = useState(apartment.rentPerNight)


    const form_submiter = async (e) => {
        // console.log(`form submitter called`)
        e.preventDefault();
        if (confirm("are you sure to make changes")) {
            const updateApart =
            {
                apartmentId: apartment.apartmentId,
                apartmentTitle: apartTitle,
                bedRoom: bedroom,
                livingRoom: livingRoom,
                drawingRoom: drawingRoom,
                diningRoom: diningRoom,
                washroom: washroom,
                desc: apartDes,
                rentPerNight:price,
            }
            console.log(`in edit form apart=>${updateApart  .apartmentId}`)
            editFunc(updateApart);
        }
        setEdit(false)
        seteditApart(false)

    }




    return (
        <div className={styles.form_container} id="not_blur">
            <h2>
                You can always customize your rental details
            </h2>


            <form action="" method="post">

                <label htmlFor="">Apartment title</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="text" id="first_name" name="first"
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    value={apartTitle}
                />
                <br />
                <label htmlFor="rent per night">Rent per Night :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    value={price} />

                <br />
                <label htmlFor="">Description</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="text" id="last_name" name="last"
                    onChange={(e) => {
                        setDes(e.target.value)
                    }}
                    value={apartDes} />
                <br />
                <label htmlFor="bedroom no">No of Bedrooms :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setBedroom(e.target.value)
                    }}
                    value={bedroom} />

                <br />
                <label htmlFor="washroom no">No of Washroom :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setWash(e.target.value)
                    }}
                    value={washroom} />
                <br />
                <label htmlFor="living no">No of living rooms :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setLiving(e.target.value)
                    }}
                    value={livingRoom} />
                <br />
                <label htmlFor="living no">No of Dining rooms :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setDine(e.target.value)
                    }}
                    value={diningRoom} />
                <br />
                <label htmlFor="living no">No of drawing rooms :</label>
                <input style={{ fontSize: "1.8rem", padding: "0 0.8rem", fontWeight: 'bold' }} type="number"
                    onChange={(e) => {
                        setdrawing(e.target.value)
                    }}
                    value={drawingRoom} />
                <br />

                <div className={styles.btn}>
                    <button type="submit"
                        onClick={
                            (livingRoom && diningRoom && drawingRoom && bedroom && apartTitle && apartDes && washroom && price) ?
                                form_submiter :
                                () => {
                                    alert("Please fill out all the fields")
                                }
                        }
                    >Update Apartment</button>
                </div>
            </form>
        </div>
    )
}

export default ApartEditForm







