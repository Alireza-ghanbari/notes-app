import React from 'react'
import { GoNote } from "react-icons/go";


export default function Navbar() {
  return (
    <nav className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2 flex items-center gap-2'>
          <span className='rotate-12'>
            <GoNote size={18} />
          </span>
          Daily Notes 
          </h2>
    </nav>
  )
}
