'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { formatarParaReal } from '../../assets/js/scripts';
import { getTitulosCredor } from '../../api/credor/getTitulosCredor';
import formatDate from '../../../(marketplace)/lib/formatDate';

export default function TabelaTitulosAntecipados({ codPerfil, dataSelected }) {
  const [titulos, setTitulos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filtrar os títulos que têm o subobjeto titulo_antecipado
        const titulosAntecipados_ = await getTitulosCredor(codPerfil, dataSelected);
        const titulosAntecipados = titulosAntecipados_.filter(titulo => titulo.titulo_antecipado);
        setTitulos(titulosAntecipados);
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
            <TableCell>{(titulo.tipo_titulo.charAt(0).toUpperCase() + titulo.tipo_titulo.slice(1))}</TableCell>
            <TableCell>{formatarParaReal(titulo.valor_titulo)}</TableCell>
            <TableCell>{formatarParaReal(titulo.titulo_antecipado.valor_pago)}</TableCell>
            <TableCell>{formatarParaReal(titulo.desagio)}</TableCell>
            <TableCell>{formatDate(titulo.data_cadastro)}</TableCell>
            <TableCell>{formatDate(titulo.titulo_antecipado.data_antecipacao)}</TableCell>
            <TableCell>{(titulo.risco.charAt(0).toUpperCase() + titulo.risco.slice(1))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
