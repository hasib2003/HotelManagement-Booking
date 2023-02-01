import React from 'react'
import styles from "../styles/header.module.css"

const Header = ({text="hi i am the header"}) => {

  return (
    <div className={styles.head}>
        <h1 >
            {text}
        </h1>
    </div>
  )
}

export default Header