
import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
const UserCard = ({ checkIn, checkOut, apart }) => {
    const [displayMore, setDisplay] = useState(false)
    const [revI, setRev] = useState(false)
    const Router = useRouter()


    useEffect(
        () => {
            const fetchReview = async () => {
                axios.post(
                    "http://localhost:4000/get/reviews", {
                    "appartmentId": apart["appartmentId"]
                }
                ).then(
                    (res) => {
                        console.log("reviews res->", res.data)
                        setReviews(res.data)
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
            }

            fetchReview()
        }

        , []
    )
    const [reviews, setReviews] = useState([])
    return (



        <div className={styles.apart}>
            <div className={styles.desc}>


                <h2>
                    <i> {apart["appartmentTitle"]}</i>
                </h2>
                <h3>
                    Star Rating: <i>{apart["rStar"]} </i>

                </h3>

                {!displayMore ?
                    <div className={styles.btn}
                    >
                        <button onClick={() => { setDisplay(true) }}>See more</button>
                    </div>
                    :


                    <div>


                        <div className={styles.reviews}>

                            {!revI ?
                                <div className={styles.btn}
                                >
                                    <button onClick={() => { setRev(true) }}>Reviews</button>
                                </div>
                                :
                                <div>
                                    {

                                        reviews.map(
                                            (rev) => (
                                                <div className={styles.reviewIn}>
                                                    <h3>{rev["firstName"]}</h3>
                                                    <p>{rev["review"]}</p>
                                                </div>
                                            )
                                        )

                                    }
                                    < button onClick={() => { setRev(false) }}>Hide Reviews</button>

                                </div>
                            }
                        </div >
                        <h2>
                            Bedrooms:{apart["bedroom"]}

                        </h2>
                        <h2>
                            kitchen: {apart["kitchen"]}

                        </h2>
                        <h2>
                            tvLounge: {apart["tvLounge"]}

                        </h2>
                        <h2>
                            Living Room: {apart["livingRoom"]}

                        </h2>
                        <h2>
                            Dining Room: {apart["diningRoom"]}

                        </h2>
                        <h2>
                            Balcony: {apart["balcony"]}

                        </h2>
                        <div className={styles.btn}>
                        <button onClick={() => { setDisplay(false) }}>See less</button>
                        </div>
                    </div>





                }

            </div>

            <div className={styles.booking}>
            <h3>
        {apart["appartmentDesc"]}
                </h3>
                <h2>
                     PKR : {apart["priceOfRoom"]}
                </h2>

                <button onClick={() => {
                    checkIn && checkOut ?
                        Router.push({
                            pathname: '/booking', query: {
                                "apartId": apart["appartmentId"]
                                , 'In': checkIn, "out": checkOut
                            }
                        }) :
                        alert("Kindly Select CheckIn and Checkout dates")


                    // console.log(apart)

                }}>

                    Book Now
                </button>
            </div>
        </div >
    )
}

export default UserCard