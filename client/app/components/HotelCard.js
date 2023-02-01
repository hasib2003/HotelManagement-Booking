import styles from "../styles/Hotelcard.module.css"
import { VscChromeClose, VscEdit } from "react-icons/vsc"
import { useEffect, useState } from "react"
import HotelForm from "./HotelFrom"
import Link from "next/link"

const HotelCard = ({ card, deleteObject, editObject, edit, setEdit }) => {

  const [editHotel, setEditHotel] = useState(false)
const [hotelId,setHotel] = useState(null)

  const blurClass = edit ? styles.blurCard : " "
  useEffect(
    ()=>{
setHotel(card.hotelId)

    },[]
  )

  return (




    <div>
      {!editHotel
        ?
        <div className={blurClass + " " + styles.hotelCard}>

          <div className={styles.hotelDesc}>

            <div className={styles.changeCorner}>
              <h1>{card["hotelName"]}</h1>
              <div className={styles.editor}>

                <VscEdit size={28} onClick={
                  (card) => {
                    editObject(card);
                    setEditHotel(!editHotel)
                    setEdit(!edit)
                  }
                } />
                <VscChromeClose size={28} onClick={
                  () => {

                    deleteObject(card);

                  }
                } />

              </div>
            </div>


            <h2>{card.address}</h2>
            <h2>{card["hotelEmail"]}</h2>
            <h2>{card["hotelLandline"]}</h2>

            <Link href={{ pathname: '/apartment', query: { "hotelId": hotelId } }}>

           
              <h3>
                See all Apartments here
              </h3>
            </Link>


          </div>


        </div>
        : <HotelForm hotel={card} editLocal={editHotel} setEditLocal={setEditHotel} />
      }
    </div>
  )
}

export default HotelCard
