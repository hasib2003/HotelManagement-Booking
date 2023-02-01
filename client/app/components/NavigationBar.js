import React from 'react'
import Link from 'next/link'


const NavigationBar = () => {
  return (
    <div className='Navbar'>
        <ul>
            <li>
                <Link href="/home">
                    <a>
                        Home
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/top-hotels">
                    <a>
                        Top Rated 
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/all-hotels">
                    <a>
                        All Hotels
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/contact">
                    <a>
                        Contact Us
                    </a>
                </Link>
            </li>

        </ul>
    </div>
  )
}

export default NavigationBar