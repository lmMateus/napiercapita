'use client'
import React, {useEffect, useState} from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { CircleDollarSign } from 'lucide-react';
import { formatarParaReal } from '../../assets/scripts';
import { getLucroTotalTitulosAntecipadosInvestidor } from '../../assets/investidor/getLucroTotalTitulosAntecipadosInvestidor';
import { getVolumeTitulosAntecipadosInvestidor } from '../../assets/investidor/getVolumeTitulosAntecipadosInvestidor';
import { getValorTotalTitulosAntecipadosInvestidor } from '../../assets/investidor/getValorTotalTitulosAntecipadosInvestidor';


export default function CardComponent({codPerfil}) {
    const [volumeAntecipado, setVolumeAntecipado] = useState(0);
    const [valorAntecipado, setValorAntecipado] = useState(0);
    const [lucroAntecipado, setLucroAntecipado] = useState(0);

    const cod_perfil = codPerfil;


    useEffect(() => {
        const fetchVolumeAntecipado = async () => {
            try{
                const volume = await getVolumeTitulosAntecipadosInvestidor(cod_perfil)
                setVolumeAntecipado(volume);
            } catch (err) {
                console.error('Erro ao obter o volume total de títulos antecipados');
            }
        }

        const fecthValorAntecipado = async () => {
            try{
                const valor = await getValorTotalTitulosAntecipadosInvestidor(cod_perfil)
                setValorAntecipado(valor)
            }catch (err) {
                console.error('Erro ao obter o valor total de títulos antecipados');
            }
        }

        const fecthLucroAntecipado = async () => {
            try{
                const lucro = await getLucroTotalTitulosAntecipadosInvestidor(cod_perfil)
                setLucroAntecipado(lucro)
            }catch (err) {
                console.error('Erro ao obter lucro total dos títulos antecipados');
            }
        }

        fetchVolumeAntecipado();
        fecthValorAntecipado();
        fecthLucroAntecipado();
    }, []);

    const CardsInfo = [
        {
            title: "Antecipado",
            description: "Valor Total",
            total: valorAntecipado,
            typeCard: "valor"
        },
        {
            title: "Antecipado",
            description: "Volume",
            total: volumeAntecipado,
            typeCard: "volume"
        },
        {
            title: "Lucro",
            description: "Valor Total",
            total: lucroAntecipado,
            typeCard: "valor"
        },
    ];

    const Cards = CardsInfo.map((CardInfo, index) => (
        <Card key={index}>
            <CardHeader>
                <CardTitle>{CardInfo.title}<CircleDollarSign className='inline ml-1 text-green-800' /></CardTitle>
                <CardDescription className="pb-4 text-md">{CardInfo.description}</CardDescription>
                <hr/>
            </CardHeader>
            <CardContent className="text-lg">
                { CardInfo.typeCard === "valor"
                    ? (<p className='font-semibold' key={index}>{formatarParaReal(CardInfo.total)} <span className='text-gray-600 font-medium'>BRL</span></p>)
                    : (<p className='font-semibold' key={index}>{CardInfo.total}</p>)
                }
            </CardContent>
        </Card>
    ));

    return (
        <>{Cards}</>
    )
}
