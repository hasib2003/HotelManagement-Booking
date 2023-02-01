import { useEffect, useState } from "react"

import styles from "../styles/Home.module.css"
import axios from "axios"
const booking = ({ apartId, In, out }) => {
    const [customer, setCustomer] = useState([])
    const [reqd, setReqd] = useState(false)
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [cnic, setCnic] = useState("")

    const [isreg, setreg] =useState(false)

    const [customerId, setId] = useState(0)

    const [apart, setApart] = useState([])


    const findDays = () => {
        let date_2 = new Date(In);
        let date_1 = new Date(out);
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(TotalDays)

        return TotalDays + 1

    }
    useEffect(
        () => {
            // setId(customer["customerId"])


            async function getApartment() {
                axios.post("http://localhost:4000/get/apartmentbyId", {
                    "apartId": apartId
                }).then
                    (
                        (res) => {
                            console.log(res.data)

                            setApart(res.data[0])


                        }
                    ).catch(e => { console.log(e) })

            }

            async function checkSession() {
                axios.defaults.withCredentials = true;
                axios.get("http://localhost:4000/authen/customer").then
                    (
                        (res) => {
                            console.log(res.data)

                            if (res.data["status"] === "accepted") {
                                //   setLogin(true)
                                console.log(res.data)
                                setReqd(true)
                                setreg(true);
                                setCustomer(res.data["session"])
                                setfirstName(customer["firstName"])
                                setlastName(customer["lastName"])
                                setEmail(customer["userName"])
                                setCnic(customer["cnic"])

                            }
                            else
                            {
                                setCustomer = null;
                            }
                        }
                    ).catch(e => { console.log(e) })
            }



            checkSession();{
            getApartment();
        }
    }, [reqd]

    )

    // const getDate(x)
    // {

    //     return (x.get)
    // }
    const  saveBookingToServer = async ()=>
    {

        if (isreg == true){
            console.log(customer)

            axios.post("http://localhost:4000/book",
            {
                "booking":{
                    "BookingEmail":customer["userName"],
                    "customerId":customer["customerId"],
                    "appartmentId":parseInt(apartId),
                    "noOfAppartments":1,
                    "totalPrice":findDays() * apart["priceOfRoom"],
                    "discount":100,
                    "checkIn":In,
                    "checkOut":out,
                        }
            }).then(
                (res) => {
                    console.log(res.data)

                }
            ).catch(
                (err) => {
                    alert("error while communicating to server")
                }
            )



        }
       
        else
        {
        console.log("in the else value is ",customerId);
        axios.post("http://localhost:4000/book",
        {
            "booking":{
                "BookingEmail":email,
                "customerId":customerId,
                "appartmentId":parseInt(apartId),
                "noOfAppartments":1,
                "totalPrice":findDays() * apart["priceOfRoom"],
                "discount":100,
                "checkIn":In,
                "checkOut":out,
                    }
        }).then(
            (res) => {
                console.log(res.data)

            }
        ).catch(
            (err) => {
                alert("error while communicating to server")
            }
        )

        }



    }

    const saveIntoServer = async () => {
        axios.post("http://localhost:4000/register/temp_customer",
            {
                "customer": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "cnic": cnic
                }
            }).then(
                (res) => {
                    console.log("temp save result ",res.data["id"])
                    setId(res.data["id"])

                    console.log("value in id", customerId)

                    setReqd(true)

                }
            ).catch(
                (err) => {
                    console.log(err)
                    alert("error while communicating to server")
                }
            )
    }



    return (
        <div>
            {reqd ?



                <div className={styles.apart}>
                                        <div className={styles.booking}>
                        <h1>
                          {firstName + " "+ lastName}
                        </h1>
                        <h3>
                          

                              {email}
                        </h3>
                        <h3>
                           
                               {cnic}
                        </h3>
                        <h4>
                           
                                Check In : {In}
                        </h4>
                        <h4>


                                Check Out : 
                            {out}
                        </h4>
                        <h4>
                         
                                Gross Amount :{findDays() * apart["priceOfRoom"]}
                        </h4>
                        <h4>
                           

                                Discount:
                               
                        </h4>
                        <h4>
                           

                                Net Amount:
                              
                        </h4>

                        <button onClick={() => {
                            saveBookingToServer();
                            window.print()
                        }}>Confirm Booking</button>
                    </div>
                    <div className={styles.desc}>

                        <h2>
                           
                                {apart["hotelName"]}
                        </h2>
                        <h2>
                            
                             {apart["hotelLandline"]}
                        </h2>
                        <h2>
                            
                               {apart["hotelEmail"]}
                        </h2>
                        <h2>

                        </h2>
                        <h2>
                            {apart["appartmentTitle"]}                     </h2>
                        <h4>
                            {apart["appartmentDesc"]}
                        </h4>
                        <h3>
                            Star Rating : {apart["rStar"]}

                        </h3>
                        <div>
                            <h4>
                                Bedrooms : {apart["bedroom"]}

                            </h4>
                            <h4>
                                kitchen : {apart["kitchen"]}

                            </h4>
                            <h4>
                                tvLounge : {apart["tvLounge"]}

                            </h4>
                            <h4>
                                Living Room : {apart["livingRoom"]}

                            </h4>
                            <h4>
                                Dining Room : {apart["diningRoom"]}

                            </h4>
                            <h4>
                                Balcony : {apart["balcony"]}

                            </h4>

                        </div>


                    </div>

                </div>

                :
                <div className={styles.userForm}>
                    <h2>
                        Please fill out required Information for confirming Booking
                    </h2>

                    <h3>
                        First Name
                    </h3>
                    <input type="text" value={firstName} onChange={(e) => { setfirstName(e.target.value) }} />
                    <h3>
                        Last Name
                    </h3>
                    <input type="text" value={lastName} onChange={(e) => { setlastName(e.target.value) }} />
                    <h3>
                        Email
                    </h3>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <h3>
                        Cnic
                    </h3>
                    <input type="text" value={cnic} onChange={(e) => { setCnic(e.target.value) }} />

                        <div id={styles.confirm} className={styles.btn}>

                   
                    <button onClick={() => {
                        if (firstName && lastName && email && cnic)
                        {
                        if (confirm("Are sure this Info is correct, company shall not be responsible for problems because of wrong information mistakes")) {
                            saveIntoServer();
                        }
                    }
                    else
                    {
                        alert("Please fill out all fields")
                    }
                    }}

                    >Confirm</button>
                         </div>
                </div>
            }








        </div>
    )
}


booking.getInitialProps = async ({ query }) => {
    const { apartId, In, out } = query

    return { apartId, In, out }
}
export default booking

