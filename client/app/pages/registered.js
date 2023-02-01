import React from 'react'
import Link from 'next/link'
const registered = () => {
  return (
    <div >
        <h2>
            Registered Successfully
        </h2>
    <li>
        <Link href="/signin">
        go to signin page and continue
        </Link>
    </li>
    </div>
  )
}

export default registered