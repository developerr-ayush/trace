import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa6";
const Links = [
    {label:"Dashboard" , href:"/"},
    {label:"Issues" , href:"/issues"},
]
const NavBar = () => {
  return (
    <nav className='flex items-center space-x-6 border-b mb-5 py-4 px-3 '>
        <Link href="/"><FaBug /></Link>
        <ul className='flex'>
            {Links.map((link,i)=>{
                return <li key={i} className='px-3 opacity-70 hover:opacity-100 transition-opacity'><Link href="/">{link.label}</Link></li>
            })}
        </ul>
    </nav>
  )
}

export default NavBar