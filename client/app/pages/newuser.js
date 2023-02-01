import Head from "next/head"
import Form from "../components/Form"
import styles from "../styles/newuser.module.css"
const newuser = () => {
  return (
    <div className={styles.container}>

    <Head>
      <title>
        Join now and make your Businnes Grow
      </title>
    </Head>
    <Form/>
    </div>
    )
}

export default newuser