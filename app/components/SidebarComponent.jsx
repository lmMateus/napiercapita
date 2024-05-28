'use client'
import React, { useState, useEffect } from 'react';
import { Menu, LayoutDashboard, CircleUserRound, Settings, LogOut, X, FileText, HandCoins } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import LogoNapierCapital from "@/public/logo_transparente.png"



export default function SidebarComponent() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false); // Ensure sidebar is closed initially on client-side render
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <nav className="md:hidden sticky top-0 left-0 bg-slate-800 py-3 px-2 mb-4 flex flex-row items-center">
                <Link href="/titulos" className="hover:text-slate-400 flex items-center">
                    <Image src={LogoNapierCapital} className="w-32" />
                </Link>
                <button className="bg-slate-800 rounded-md p-1 ml-auto" onClick={toggleSidebar}>
                    <Menu className="text-white" size={32} />
                </button>
            </nav>



            <div className={`w-64 fixed top-0 right-0 md:left-0 h-full bg-slate-800 text-slate-100 p-4 shadow-lg shadow-slate-900 ${isOpen ? 'block' : 'hidden'} md:block`}>
                {/* Sidebar content */}
                <nav>
                    <button className={`block md:hidden absolute bg-slate-800 p-2 top-0 right-0 m-2`} onClick={toggleSidebar} >
                        <X className="text-slate-100 hover:text-slate-400" size={28} />
                    </button>
                    <h2 className="md:block hidden text-2xl pb-4 pt-2">Menu</h2>
                    <ul className='flex flex-col space-y-4 text-lg pt-8 md:pt-2 pl-2'>
                        <li className='flex flex-row'>
                            <Link href="/titulos" className='hover:text-slate-400'>
                                <HandCoins className='mr-2 inline' />
                                Marketplace
                            </Link>
                        </li>
                        <li className='flex flex-row'>
                            <Link href="/dashboard" className='hover:text-slate-400'>
                                <LayoutDashboard className='mr-2 inline' />
                                Dashboard
                            </Link>
                        </li>
                        <li className='flex flex-row'>

                            <Link href="/relatorio" className='hover:text-slate-400'>
                                <FileText className='mr-2 inline' />
                                Relatório
                            </Link>
                        </li>

                        <li className='flex flex-row'>

                            <Link href="/gerenciar-titulos" className='hover:text-slate-400'>
                                <Settings className='mr-2 inline' />
                                Meus Títulos
                            </Link>
                        </li>

                        <li className='flex flex-row'>
                            <Link href="/perfil" className='hover:text-slate-400'>
                                <CircleUserRound className='mr-2 inline' />
                                Perfil
                            </Link>
                        </li>
                        <li className='flex flex-row'>

                            <Link href="/" className='hover:text-slate-400'>
                                <LogOut className='mr-2 inline' />
                                Encerrar Seção
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    );
};
