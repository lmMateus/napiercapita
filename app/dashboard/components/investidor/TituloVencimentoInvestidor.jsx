'use client'
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatarParaReal, calculaLucro } from "../../assets/js/scripts";
import { getTituloVencimentoProximo } from "../../api/investidor/getTitulosVencimentoProximo";

export default function TituloVencimento({codPerfil}) {

    const [titulos, setTitulos] = useState([])
    const cod_perfil = codPerfil; 

    useEffect(() => {
        const fetchTitulosAntecipados = async () => {
            try {
                const titulosAntecipados = await getTituloVencimentoProximo(cod_perfil);
                setTitulos(titulosAntecipados);
            } catch (error) {
                console.error('Erro ao buscar títulos com data de vencimento próxima');
            }
        };
        fetchTitulosAntecipados();
    }, []);

    const TitulosCard = titulos.map((titulo, index) => (
        <Card key={index}>
            <CardHeader>
                <CardTitle className="mb-2 text-2xl">{titulo["titulo"]["tipo_titulo"]}</CardTitle>
                <CardDescription className="text-md">{titulo["titulo"]["descricao"]}</CardDescription>
                <CardDescription className="text-md">Data de vencimento: {titulo["titulo"]["data_vencimento"].toLocaleDateString("pt-BR", {
                    day: '2-digit', month: '2-digit', year: 'numeric'
                })}</CardDescription>
            </CardHeader>
            <CardContent>
                <hr />
                <div className="flex justify-between text-lg pt-6">
                    <p className='font-semibold'>{formatarParaReal(titulo["titulo"]["valor_titulo"])} <span className='text-gray-600 font-medium'>BRL</span></p>
                    <p className='text-green-500 font-semibold'>+{formatarParaReal(calculaLucro(titulo["titulo"]["valor_titulo"], titulo["titulo"]["valor_ofertado"]))}</p>
                </div>

            </CardContent>
        </Card>
    ));

    return (
        <>
            {TitulosCard}

        </>
    );
}
