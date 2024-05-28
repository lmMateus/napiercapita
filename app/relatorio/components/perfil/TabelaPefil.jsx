'use client'
import React, { useEffect, useState } from 'react';
import { getPerfil } from '@/lib/perfil/getPerfil.js';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead
} from "@/components/ui/table"
import { formatarCPF } from '../../../assets/js/formataCPF';
import { formatarCNPJ } from '../../../assets/js/formataCNPJ';

export default function TabelaPerfil({ codPerfil }) {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const perfilData = await getPerfil(codPerfil);
                setPerfil(perfilData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [codPerfil]);

    if (!perfil) {
        return <p>Carregando...</p>;
    }

    return (
        <Table>
            <TableBody>
                <TableRow>
                    {perfil.tipo_persona === 'pessoa_fisica' ? (
                        <>
                            <TableHead className="font-semibold border-b">Nome:</TableHead>
                            <TableCell className="border-b">{perfil.pessoa_fisica.nome}</TableCell>
                            <TableHead className="font-semibold border-b">Email:</TableHead>
                            <TableCell className="border-b">{perfil.email}</TableCell>
                            <TableHead className="font-semibold border-b">CPF:</TableHead>
                            <TableCell className="border-b">{formatarCPF(perfil.pessoa_fisica.cpf)}</TableCell>
                        </>
                    ) : (
                        <>
                            <TableHead className="font-semibold border-b">Razão Social:</TableHead>
                            <TableCell className="border-b">{perfil.pessoa_juridica.razao_social}</TableCell>
                            <TableHead className="font-semibold border-b">Email:</TableHead>
                            <TableCell className="border-b">{perfil.email}</TableCell>
                            <TableHead className="font-semibold border-b">CNPJ:</TableHead>
                            <TableCell className="border-b">{formatarCNPJ(perfil.pessoa_juridica.cnpj)}</TableCell>
                        </>
                    )}
                </TableRow>
            </TableBody>
        </Table>
    );
}
