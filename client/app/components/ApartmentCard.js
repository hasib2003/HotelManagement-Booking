
import styles from "../styles/Hotelcard.module.css"
import { VscChromeClose, VscEdit } from "react-icons/vsc"
import ApartEditForm from "./ApartEditForm"

import { useState } from "react"


const ApartmentCard = ({  card, editObject, deleteObject, edit, setEdit }) => {

    const [editapart, seteditApart] = useState(false);

    const blurClass = edit ? styles.blurCard : " "
    console.log("apartment",card)
    return (
        <div>
            {!editapart
            ?
                <div className={blurClass + " " + styles.apartmentlCard}>

                    <div className={styles.hotelDesc}>
                        <div className={styles.changeCorner}>
                            <h1>{card.appartmentTitle}</h1>
                            
                            <div className={styles.editor}>

                                <VscEdit size={28} onClick={
                                    () => {
                                        setEdit(!edit)
                                        seteditApart(!editapart)
                                        editObject();
                                       
                                    }
                                } />
                                <VscChromeClose size={28} onClick={
                                    () => {
                                        deleteObject(card)
                                    }
                                } />

                            </div>
                        </div>

                        <h2>Booked: {card.totalAppartments - card.availableAppartments}</h2>
                        <h2>Total: {card.totalAppartments}</h2>
                        <h2>Bedrooms: {card.bedroom}</h2>
                        <h3>{card.appartmentDesc}</h3>
                        <h3>Rent Per Night: {card.priceOfRoom}</h3>
                    </div>

                </div>
            :
                <ApartEditForm apartment={card} setEdit = {setEdit} seteditApart={seteditApart} editFunc={editObject} />
     
   
        }

        </div>



    )
}

export default ApartmentCard