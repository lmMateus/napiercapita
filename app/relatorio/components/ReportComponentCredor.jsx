'use client'
import React, { useEffect, useState } from 'react';
import TabelaResumoTitulos from './credor/TabelaResumoTitulos';
import TabelaTitulosOfertado from './credor/TabelaTitulosOfertado';
import TabelaTitulosAntecipados from './credor/TabelaTitulosAntecipados';

export default function ReportComponentCredor({ codPerfil, dataSelected }) {
    return (
        <>
            <div className="space-y-8">
                <div className="border rounded-lg p-6 bg-white shadow-md">
                    <header className="pb-4">
                        <h2 className="text-xl font-semibold text-slate-700 pb-4">Resumo</h2>
                        <p className="text-slate-700">
                            Este é um resumo dos títulos para o período selecionado. Ele fornece uma visão geral dos títulos, incluindo informações como valor total de títulos antecipados, volume total de títulos antecipados e outras métricas relevantes.
                        </p>
                    </header>
                    <TabelaResumoTitulos codPerfil={codPerfil} dataSelected={dataSelected} />
                </div>

                <div className="border rounded-lg p-6 bg-white shadow-md">
                    <header className="pb-4">
                        <h2 className="text-xl font-semibold text-slate-700 pb-4">Títulos Ofertados</h2>
                        <p className="text-slate-700">
                            Nesta seção, você encontrará uma lista dos títulos ofertados para o período selecionado. Esses títulos representam as ofertas disponíveis para investimento ou financiamento.
                        </p>
                    </header>
                    <TabelaTitulosOfertado codPerfil={codPerfil} dataSelected={dataSelected} />
                </div>

                <div className="border rounded-lg p-6 bg-white shadow-md">
                    <header className="pb-4">
                        <h2 className="text-xl font-semibold text-slate-700 pb-4">Títulos Antecipados</h2>
                        <p className="text-slate-700">
                            Aqui estão os detalhes dos títulos que foram antecipados durante o período selecionado. Isso inclui informações sobre os títulos antecipados, como data de antecipação, valor pago e outros detalhes relevantes sobre a transação de antecipação.
                        </p>
                    </header>
                    <TabelaTitulosAntecipados codPerfil={codPerfil} dataSelected={dataSelected} />
                </div>
            </div>
        </>
    );
}

