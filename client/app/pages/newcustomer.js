import Head from "next/head"
import NewCustomerForm from "../components/NewCustomerForm"
import styles from "../styles/newuser.module.css"
const newuser = () => {
  return (
    <div className={styles.container}>

    <Head>
      <title>
       Register Now to Make the Books Easier 
      </title>
    </Head>
    <NewCustomerForm/>
    
    </div>
    )
}

export default newuser