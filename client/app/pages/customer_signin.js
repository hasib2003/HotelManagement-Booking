import React from 'react'
import styles from "../styles/signin.module.css"
import CustomerSignin from '../components/CustomerSignin'
const customer_signin = () => {
  return (
    <div className={styles.container}>

        <CustomerSignin/>
    </div>
  )
}

export default customer_signin