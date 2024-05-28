"use client"
import React from "react";
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from "next/link";


export default function FooterHomeComponent() {
    return (
        <footer className="flex flex-row justify-between px-6 md:px-28 py-8 bg-slate-900">
            <div className="flex flex-col space-y-1">
                <h4 className="text-slate-400 text-lg font-medium">Institucional</h4>
                <Link href="/quem-somos" className="text-slate-400 text-md hover:text-slate-600">Sobre nós</Link>
                <Link href="#" className="text-slate-400 text-md hover:text-slate-600">Termos de serviços</Link>
            </div>
            <div className="flex flex-col">
                <h4 className="text-slate-400 text-lg pb-4 font-medium">Nossas Redes</h4>
                <div className="flex flex-row justify-between">
                    <Link href="#" className="text-slate-400 text-sm hover:text-slate-600">
                        <Facebook size={24} />
                    </Link>
                    <Link href="#" className="text-slate-400 text-sm hover:text-slate-600">
                        <Instagram size={24} />
                    </Link>
                    <Link href="#" className="text-slate-400 text-sm hover:text-slate-600">
                        <Linkedin size={24} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}