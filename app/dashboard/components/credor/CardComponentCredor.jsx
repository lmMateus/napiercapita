'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { CircleDollarSign } from 'lucide-react';
import { formatarParaReal } from '../../assets/js/scripts';
import { getVolumeTitulosOfertadoCredor } from '../../api/credor/getVolumeTitulosOfertadoCredor';
import { getValorTotalTitulosOfertadoCredor } from '../../api/credor/getValorTotalTitulosOfertadoCredor';
import { getValorTotalTitulosAntecipadosCredor } from '../../api/credor/getValorTotalTitulosAntecipadosCredor';
import { getVolumeTitulosAntecipadosCredor } from '../../api/credor/getVolumeTitulosAntecipadosCredor';
import { getValorTotalTitulosDisponivelCredor } from '../../api/credor/getValorTotalTitulosDisponivelCredor';
import { getVolumeTitulosDisponivelCredor } from '../../api/credor/getVolumeTitulosDisponivelCredor';



export default function CardComponentCredor({ codPerfil }) {
    const [volumeOfertado, setVolumeOfertado] = useState(0);
    const [valorOfertado, setValorOfertado] = useState(0);
    const [valorAnteciado, setValorAntecipado] = useState(0);
    const [volumeAnteciado, setVolumeAntecipado] = useState(0);
    const [valorDisponivel, setValorDisponivel] = useState(0);
    const [volumeDisponivel, setVolumeDisponivel] = useState(0);

    const cod_perfil = codPerfil;

    useEffect(() => {

        const fetchVolumeOfertado = async () => {
            try {
                const volume = await getVolumeTitulosOfertadoCredor(cod_perfil);
                setVolumeOfertado(volume);
            } catch (error) {
                console.error('Erro ao buscar volume ofertado:', error);
            }
        }

        const fetchValorOfertado = async () => {
            try {
                const valor = await getValorTotalTitulosOfertadoCredor(cod_perfil);
                setValorOfertado(valor);
            } catch (error) {
                console.error('Erro ao buscar valor ofertado:', error);
            }
        }

        const fecthValorAntecipado = async () => {
            try {
                const valor = await getValorTotalTitulosAntecipadosCredor(cod_perfil);
                setValorAntecipado(valor);
            } catch (error) {
                console.error('Erro ao buscar valor antecipado:', error);
            }
        }

        const fetchVolumeAntecipado = async () => {
            try {
                const volume = await getVolumeTitulosAntecipadosCredor(cod_perfil);
                setVolumeAntecipado(volume);
            } catch (error) {
                console.error('Erro ao buscar volume antecipado:', error);
            }
        }

        const fetchValorDisponivel = async () => {
            try {
                const valor = await getValorTotalTitulosDisponivelCredor(cod_perfil);
                setValorDisponivel(valor);
            } catch (error) {
                console.error('Erro ao buscar valor disponível:', error);
            }
        }

        const fetchVolumeDisponivel = async () => {
            try {
                const volume = await getVolumeTitulosDisponivelCredor(cod_perfil);
                setVolumeDisponivel(volume);
            } catch (error) {
                console.error('Erro ao buscar volume disponível:', error);
            }
        }

        fetchVolumeOfertado();
        fetchValorOfertado();
        fecthValorAntecipado();
        fetchVolumeAntecipado();
        fetchValorDisponivel();
        fetchVolumeDisponivel();
    }, [])


    const CardsInfo = [
        {
            title: "Ofertado",
            description: "Valor Total",
            total: valorOfertado,
            typeCard: "valor"
        },
        {
            title: "Ofertado",
            description: "Volume Total",
            total: volumeOfertado,
            typeCard: "volume"
        },
        {
            title: "Disponível",
            description: "Valor Total",
            total: valorDisponivel,
            typeCard: "valor"
        },
        {
            title: "Disponível",
            description: "Volume Total",
            total: volumeDisponivel,
            typeCard: "volume"
        },
        {
            title: "Antecipado",
            description: "Valor Total",
            total: valorAnteciado,
            typeCard: "valor"
        },
        {
            title: "Antecipado",
            description: "Volume Total",
            total: volumeAnteciado,
            typeCard: "volume"
        },
    ];

    const Cards = CardsInfo.map((CardInfo, index) => (
        <Card key={index}>
            <CardHeader>
                <CardTitle>{CardInfo.title}<CircleDollarSign className='inline ml-1 text-green-800' /></CardTitle>
                <CardDescription className="pb-4 text-md">{CardInfo.description}</CardDescription>
                <hr />
            </CardHeader>
            <CardContent className="text-lg">
                {CardInfo.typeCard === "valor"
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
