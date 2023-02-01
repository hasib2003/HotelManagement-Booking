import Head from "next/head"
import styles from "../styles/layout.module.css"
import Link from 'next/link'

const Layout = ({childern}) => {
    return (
        <>
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <a>About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/blog/hello-world">
                        <a>Blog Post</a>
                    </Link>
                </li>
            </ul>


        </div>
        {childern}
        </>
    )
}

export default Layout