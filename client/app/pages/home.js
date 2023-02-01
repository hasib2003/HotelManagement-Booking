import React from 'react'
import HotelCard from '../components/HotelCard'
import Link from 'next/link'
const home = () => {
  return (
    <div>
      <Link href="/owner_signin">
        Owner Login
      </Link>
      <Link href="/manager_signin">
        Manager Login
      </Link>
      <Link href="/customer_signin">
        Customer Login
      </Link>
    </div>
    // <HotelCard/>
  )
}

export default home