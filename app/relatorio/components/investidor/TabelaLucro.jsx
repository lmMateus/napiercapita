'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { formatarParaReal } from '../../assets/js/scripts';
import { getLucroTotalTitulosAntecipadosInvestidor } from '../../api/investidor/getLucroTotalTitulosAntecipadosInvestidor';

export default function TabelaLucroInvestidor({ codPerfil, dataSelected }) {
  const [lucroAntecipado, setLucroAntecipado] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lucroAntecipado = await getLucroTotalTitulosAntecipadosInvestidor(codPerfil, dataSelected);
        setLucroAntecipado(lucroAntecipado);
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
          <TableHead className="font-semibold"></TableHead>
          <TableHead className="font-semibold">Valor Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead className="font-semibold">Lucro</TableHead>
          <TableCell>{formatarParaReal(lucroAntecipado)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
