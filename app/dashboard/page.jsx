'use client'
import React from 'react';
import CardComponentInvestidor from './components/investidor/CardComponentInvestidor';
import SidebarComponent from '@/app/components/SidebarComponent';
import TituloVencimentoInvestidor from './components/investidor/TituloVencimentoInvestidor';
import CardComponentCredor from "./components/credor/CardComponentCredor"

export default function Dashboard() {
    const perfil = "investidor"; // perfil do usuário
    const codPerfil = "bbb28e02-b2dc-4c8e-8b34-b7741177edb9" // Obter dinamicamente

    return (
        <>
            <SidebarComponent />

            <div className="md:ml-64 px-8 pt-4 md:px-12 lg:px-24 md:pt-6 mb-8"> {/* Adiciona margem à esquerda para acomodar a barra lateral */}
                <header>
                    <h1 className='text-4xl font-bold pb-2 text-slate-700'>Dashboard</h1>
                    <p className='text-xl pb-4 text-slate-700'>Informações em tempo real da sua carteira</p>
                    <hr className='my-4' />
                </header>

                {perfil === "investidor" || perfil === "ambos" ? (
                    <>
                        <h2 className='text-xs italic font-semibold pt-1 text-slate-600 mt-6'>Visão Investidor</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 min-w-max max-w-screen-2xl gap-4 justify-center mt-6'>
                            <CardComponentInvestidor codPerfil={codPerfil} />
                        </div>
                    </>
                ) : null}


                {perfil === "credor" || perfil === "ambos" ? (
                    <>
                        <h2 className='text-xs italic font-semibold pt-1 text-slate-600 mt-6'>Visão Credor</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 min-w-max max-w-screen-2xl gap-4 justify-center mt-6'>
                            <CardComponentCredor codPerfil={codPerfil} />
                        </div>
                    </>

                ) : null}


                {perfil === "investidor" || perfil === "ambos" ? (
                    <div>
                        <hr className='my-10' />
                        <h2 className='text-xs italic font-semibold pt-1 text-slate-600 mt-6'>Visão Investidor</h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center mt-6 mb-8 max-w-5xl'>
                            <TituloVencimentoInvestidor codPerfil={codPerfil} />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};
