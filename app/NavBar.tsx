"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa6";
const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
]
const NavBar = () => {
    const currentPath = usePathname()
    return (
        <nav className='flex items-center space-x-6 border-b mb-5 py-4 px-3 '>
            <Link href="/"><FaBug /></Link>
            <ul className='flex'>
                {Links.map((link, i) => {
                    return <li key={i} className={`px-3 hover:opacity-100 transition-opacity ${currentPath == link.href ? "opacity-100" : "opacity-100"}`}><Link href={link.href}>{link.label}</Link></li>
                })}
            </ul>
        </nav>
    )
}

export default NavBar