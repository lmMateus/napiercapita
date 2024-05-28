'use client'
import React, { useState, useEffect } from 'react';
import { Menu, CircleUserRound, X } from 'lucide-react';
import LogoNapierCapital from "@/public/logo_transparente.png"
import Image from "next/image";
import Link from 'next/link';


export default function NavbarHomeComponent() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false); // Ensure sidebar is closed initially on client-side render
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <nav className={`md:hidden flex justify-between items-center py-3 px-2 w-full z-10 space-x-12 sticky top-0 left-0 bg-slate-800 shadow-sm shadow-slate-900`}>
                <a href="/" className='hover:text-slate-400 pl-2'>
                    <Image src={LogoNapierCapital} className='w-32' />
                </a>
                <button className={`bg-slate-800 rounded-md text-slate-100 hover:text-slate-400 pr-4`} onClick={toggleSidebar}>
                    <Menu size={32} />
                </button>
            </nav>


            <div className={`fixed md:sticky z-10 top-0 left-0 w-full bg-slate-800 text-slate-100 p-2 shadow-sm shadow-slate-900 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <nav>
                    <button className={`block md:hidden absolute bg-slate-800 p-2 top-0 right-0 m-2`} onClick={toggleSidebar} >
                        <X className="text-slate-100 hover:text-slate-400" size={28} />
                    </button>

                    <ul className='flex flex-col justify-between md:items-center md:space-x-6 lg:space-x-8 space-y-4 md:space-y-0 text-md pb-4 md:p-0 pl-2 md:flex-row'>
                        <li className='hidden md:flex md:flex-row py-2 pl-6'>
                            <Link href="/" className='hover:text-slate-400'>
                                <Image src={LogoNapierCapital} className='w-32' />
                            </Link>
                        </li>
                        <div className='flex flex-col justify-between md:items-center md:space-x-12 space-y-4 md:space-y-0 md:flex-row md:pr-8'>
                        <li className='flex flex-row'>
                            <Link href="/quem-somos" className='hover:text-slate-400'>
                                Quem Somos
                            </Link>
                        </li>
         
                        <li className='flex flex-row'>
                            <Link href="/login" className='hover:text-slate-400 text-slate-100 flex flex-row'>
                                Acessar
                            </Link>
                        </li>
                        </div>
                    </ul>
                </nav>
            </div>

        </>
    );
};
