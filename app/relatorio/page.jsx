'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SidebarComponent from '@/app/components/SidebarComponent';
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import ReportComponentInvestidor from './components/ReportComponentInvestidor';
import ReportComponentCredor from './components/ReportComponentCredor';
import { Button } from '@/components/ui/button';
import generatePDF, { Margin } from 'react-to-pdf';
import LogoNapierCapital from "@/public/logo_transparente.png";
import TabelaPerfil from './components/perfil/TabelaPefil';
import formatDate from '../(marketplace)/lib/formatDate';



export default function Relatorio() {
    const perfil = "ambos"; // perfil do usuário
    const codPerfil = "433dd6a9-f556-4211-aa8a-198f9efd4f23"; // Obter dinamicamente

    
    const [dataSelected, setDataSelected] = useState({
        from: "2024-01-01T05:00:00.000Z",
        to: "2024-01-01T23:00:00.000Z"
    });

    const handleDateChange = (newDate) => {
        setDataSelected({
            from: newDate.from,
            to: newDate.to
        });
    };

    const fromDate = new Date(dataSelected.from);
    const toDate = new Date(dataSelected.to);

    const fromDateString = fromDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).replace(/\//g, "-");

    const toDateString = toDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).replace(/\//g, "-");

    const options = {
        method: "open",
        filename: `report_${fromDateString}_${toDateString}.pdf`,
        page: {
            margin: Margin.MEDIUM,
            format: "A4",
            orientation: "portrait",
            align: "center",
            scale: "auto"
        }
    };

    const getContentToPDF = () => document.getElementById("content");

    return (
        <>
            <SidebarComponent />

            <div className="md:ml-64 px-4 pt-4 md:px-12 lg:px-24 md:pt-6 mb-8">
                <header>
                    <h1 className='text-4xl font-bold pb-2 text-slate-700'>Relatório</h1>
                    <p className='text-xl pb-4 text-slate-700'>Este relatório oferece uma análise detalhada e atualizada da sua carteira.</p>
                    <hr className='my-4' />
                    <div className='flex flex-col lg:flex-row justify-center items-center pt-4'>
                        <DatePickerWithRange onDateChange={handleDateChange} />
                        <Button className="text-slate-100 bg-slate-700 hover:bg-slate-800 hover:text-slate-200 m-6" onClick={() => generatePDF(getContentToPDF, options)}>
                            Gerar PDF
                        </Button>
                    </div>
                </header>

                <main className='border px-2 lg:px-6 py-6 mt-4 rounded-md overflow-x-auto max-w-full flex flex-col lg:items-center lg:justify-center'>
                    <div id='content' className='text-slate-700 pt-2 pb-8 w-[794px] h-full'>
                        <Image src={LogoNapierCapital} className='w-32 lg:w-64 mb-6 mt-2' alt="Logo Napier Capital" />
                        <header className="flex flex-col items-center justify-center mb-8 text-slate-700 ">
                            <h2 className='text-2xl py-8 font-semibold'>Relatório</h2>
                            <div className='flex flex-row text-md py-8'>
                                <p className='px-8'><span className='font-semibold'>Data Inicial: </span>{formatDate(fromDate)}</p>
                                <p className='px-8'><span className='font-semibold'>Data Final: </span>{formatDate(toDate)}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='text-md py-4 font-semibold'>Dados de Cadastro</h2>
                                <TabelaPerfil codPerfil={codPerfil} />
                            </div>

                        </header>
                        <div className='grid grid-cols-1 gap-4 justify-center mt-6'>
                            {(perfil === "investidor" || perfil === "ambos") && (
                                <>
                                    <h2 className='text-sm italic font-semibold pt-1 text-slate-600 mt-4'>Visão Investidor</h2>
                                    <ReportComponentInvestidor codPerfil={codPerfil} dataSelected={dataSelected} />
                                </>
                            )}
                            {(perfil === "credor" || perfil === "ambos") && (
                                <>
                                    <h2 className='text-sm italic font-semibold pt-1 text-slate-600 mt-8'>Visão Credor</h2>
                                    <ReportComponentCredor codPerfil={codPerfil} dataSelected={dataSelected} />
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
