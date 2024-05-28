'use client'
import React, { useEffect, useState } from 'react';
import TabelaLucroInvestidor from './investidor/TabelaLucro';
import TabelaResumoTitulos from './investidor/TabelaResumoTitulos';
import TabelaTitulosAntecipados from './investidor/TabelaTitulosAntecipados';

export default function ReportComponentInvestidor({ codPerfil, dataSelected }) {
    return (
        <>
            <div className="space-y-8">
                <div className="border rounded-lg p-6 bg-white shadow-md">
                    <header className="pb-4">
                        <h2 className="text-xl font-semibold text-slate-700 pb-4">Lucro</h2>
                        <p className="text-slate-700">
                            Aqui você pode visualizar o lucro gerado pelos títulos antecipados dentro do período selecionado. Esta tabela apresenta detalhes sobre o lucro líquido obtido com os títulos antecipados realizados durante o período.
                        </p>
                    </header>
                    <TabelaLucroInvestidor codPerfil={codPerfil} dataSelected={dataSelected} />
                </div>

                <div className="border rounded-lg p-6 bg-white shadow-md">
                    <header className="pb-4">
                        <h2 className="text-xl font-semibold text-slate-700 pb-4">Resumo</h2>
                        <p className="text-slate-700">
                            Esta tabela oferece um resumo dos títulos antecipados pelo investidor no período selecionado. Ela fornece uma visão geral dos títulos, incluindo informações como valor total de títulos antecipados, volume total de títulos antecipados e outras métricas relevantes.
                        </p>
                    </header>
                    <TabelaResumoTitulos codPerfil={codPerfil} dataSelected={dataSelected} />
                </div>

                <div className="border rounded-lg p-6 bg-white shadow-md">
                    <header className="pb-4">
                        <h2 className="text-xl font-semibold text-slate-700 pb-4">Títulos Antecipados</h2>
                        <p className="text-slate-700">
                            Nesta seção, você encontrará detalhes sobre os títulos que foram antecipados pelo investidor durante o período selecionado. Isso inclui informações como data de antecipação, valor pago e outros detalhes relevantes sobre a transação de antecipação.
                        </p>
                    </header>
                    <TabelaTitulosAntecipados codPerfil={codPerfil} dataSelected={dataSelected} />
                </div>
            </div>
        </>
    );
}
