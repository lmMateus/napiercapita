'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { formatarParaReal } from '../../assets/js/scripts';
import formatDate from '../../../(marketplace)/lib/formatDate';
import { getTitulosInvestidor } from '../../api/investidor/getTitulosInvestidor';

export default function TabelaTitulosAntecipados({ codPerfil, dataSelected }) {
  const [titulos, setTitulos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titulosAntecipados_ = await getTitulosInvestidor(codPerfil, dataSelected);
        console.log(titulosAntecipados_)
        setTitulos(titulosAntecipados_);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, [codPerfil, dataSelected]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor Título</TableHead>
          <TableHead>Valor Antecipado</TableHead>
          <TableHead>Deságio</TableHead>
          <TableHead>Cadastro</TableHead>
          <TableHead>Antecipado</TableHead>
          <TableHead>Risco</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {titulos && titulos.map((titulo, index) => (
          <TableRow key={index}>
            <TableCell>{(titulo.titulo.tipo_titulo.charAt(0).toUpperCase() + titulo.titulo.tipo_titulo.slice(1))}</TableCell>
            <TableCell>{formatarParaReal(titulo.titulo.valor_titulo)}</TableCell>
            <TableCell>{formatarParaReal(titulo.valor_pago)}</TableCell>
            <TableCell>{formatarParaReal(titulo.titulo.desagio)}</TableCell>
            <TableCell>{formatDate(titulo.titulo.data_cadastro)}</TableCell>
            <TableCell>{formatDate(titulo.data_antecipacao)}</TableCell>
            <TableCell>{(titulo.titulo.risco.charAt(0).toUpperCase() + titulo.titulo.risco.slice(1))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
