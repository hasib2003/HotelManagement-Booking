import { useState } from "react"
import axios from "axios";

import styles from "../styles/managerCard.module.css"
export const ReviewCard = ({apart,customerId}) => {

    const [review, setReview] = useState("Write Review Here");
    return (
        <div className={styles.ReviewCard}>
            <div className={styles.specs}>


                <h2>
                    Appartment :{apart["appartmentTitle"]}
                </h2>
                <h3>
                    Address :{apart["address"]}

                </h3>
                <h3>
                    City :{apart["cityName"]}

                </h3>
                <h4>
                    Booked on : {apart["bookingTime"]}
                </h4>
            </div>

<div className={styles.submit}>
            <textarea name="" id="" cols="30" rows="10" value = {review} onChange={(e)=>{setReview(e.target.value)}}></textarea>
            <button onClick={
                ()=>{
                    axios.post("http://localhost:4000/register/review",
                    {
                        "customerId":customerId,
                        "appartmentId":apart["appartmentId"],
                        "review":review
                    }).then(
                        (res)=>{
                            console.log(res)
                            alert("Thankyou for your response")
                        }
                    ).catch((err)=>
                    {
                        console.log(err)
                        alert("encountered an error")
                    }
                    )
                    
                }
            }>Submit</button>
        </div>
        </div>
    )
}
