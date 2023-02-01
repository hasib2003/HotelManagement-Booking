
//it will just display all the cards in fixed size with add option at the start;
import HotelCard from "./HotelCard"
import NewHotelForm from "./NewHotelFrom"
import ApartmentCard from "./ApartmentCard"
import styles from "../styles/displayCard.module.css"
import cardStyles from "../styles/Hotelcard.module.css"
import { VscAdd } from "react-icons/vsc"
import { useState } from "react"
import ApartNewForm from "./ApartNewForm"
const DisplayCard = ({ hotelId, session, cardList, isHotel, deleteObject, editObject, edit, setEdit ,addToMain, owner_manEmail,setChange}) => {

    const blurClass = edit ? styles.blurCard : " "
    const flexCol = edit? styles.flexCol : " "
    const [addApart, setAddApart] = useState(false)
    const [addHotel, setAddHotel] = useState(false)
    return (


        <div className={flexCol+" "+styles.cardContainer}>

            {!addApart && !addHotel?
                !isHotel ?
                    <div className={blurClass + " " + cardStyles.addMore}
                        style={
                            {

                                width: "25vw"
                            }
                        }

                    >
                        <VscAdd size={72} onClick={
                            () => {
                                setAddApart(true)
                            }
                        } />
                    </div>
                    :
                    <div className={blurClass + " " + cardStyles.addMore}
                    >
                        <VscAdd size={72} 
                                                onClick={
                                                    ()=>{
                                                        setAddHotel(true);
                                                    }
                                                }/>

                    </div>
                : <></>
            }

            {
                !addApart && !addHotel?
                    cardList ?
                        isHotel ?

                            cardList.map(


                                (card) =>
                                (
                                    <HotelCard

                                        key={cardList.indexOf(card)}
                                        card={card}
                                        isHotel={isHotel}
                                        deleteObject={deleteObject}
                                        edit={edit}
                                        setEdit = {setEdit}
                                        editObject={editObject} />

                                )

                            )
                            :
                            cardList.map(

                                (card) =>
                                (
                                    <ApartmentCard 
                                    key={cardList.indexOf(card)} 
                                    card={card}
                                        isHotel={isHotel}
                                        deleteObject={deleteObject}
                                        editObject={editObject}
                                        edit={edit}
                                        setEdit={setEdit}
                                    />


                                )
                            )


                        : <></>
                    :
                    <div>
                         {
                        isHotel?
                        <NewHotelForm manEmail = {owner_manEmail} setAddHotel = {setAddHotel} setChange = {setChange}/>
                        :
                        <ApartNewForm session = {session}  add={addApart} setAdd = {setAddApart} addApartToMain={addToMain} hotelId = {hotelId}/>
                    }
                    </div>
            }



        </div>
    )
}

export default DisplayCard