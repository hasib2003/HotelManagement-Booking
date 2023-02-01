import styles from "../styles/managerCard.module.css"

import React from "react";
import axios from "axios"

const DropDown = ({ freeHotel, managerId, sessionUser }) => {





  return (
    <Dropdown sessionUser={sessionUser}

      menu={freeHotel} tarManager={managerId}
    />
  );
};

const Dropdown = ({ menu, tarManager, sessionUser }) => {

  const linkHotel = async (hotelID) => {



    console.log("link request hotelId->", hotelID, " manager id->", tarManager)

    axios.post("http://localhost:4000/link/manager",
      {
        wrap: {
          "OwnerUserName": sessionUser,
          "HotelId": hotelID,
          "Manager": tarManager,
        }
      }).then(
        (res) => {
          alert(res)
        }
      ).catch(
        (err)=>{
          alert(err)
        }
      )
return;

  }




const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(!open);
};

return (

  <div className={styles.btn}>

    {!open ? <button onClick={
      () => {
        handleOpen();
      }
    }> Assign Hotel </button> :
      null
    }





    {open ? (
      <ul className={styles.dropDown}>
        <li><button onClick={() => { handleOpen() }}>Select:</button></li>
        {
        menu.map((hotel, index) => (

          <li key={index}>

            <button onClick={
              () => {
                handleOpen()
                linkHotel(hotel["hotelId"])
              }
            }>
              {hotel["Vacant_Hotels"]}
            </button>

          </li>

        )
        )
        
        
        }
        
      </ul>
    ) : null}
  </div>
)
}

export default DropDown