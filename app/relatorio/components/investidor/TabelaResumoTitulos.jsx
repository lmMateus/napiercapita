'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { formatarParaReal } from '../../assets/js/scripts';
import { getValorTotalTitulosAntecipadosInvestidor } from '../../api/investidor/getValorTotalTitulosAntecipadosInvestidor';
import { getVolumeTitulosAntecipadosInvestidor } from '../../api/investidor/getVolumeTitulosAntecipadosInvestidor';

export default function TabelaResumoTitulosAntecipados({ codPerfil, dataSelected }) {
  const [valorAntecipado, setValorAntecipado] = useState(0);
  const [volumeAntecipado, setVolumeAntecipado] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const valorAntecipado_ = await getValorTotalTitulosAntecipadosInvestidor(codPerfil, dataSelected);
        const volumeAntecipado_ = await getVolumeTitulosAntecipadosInvestidor(codPerfil, dataSelected);

        setValorAntecipado(valorAntecipado_);
        setVolumeAntecipado(volumeAntecipado_);
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
          <TableHead></TableHead >
          <TableHead className="font-semibold">Valor Total</TableHead >
          <TableHead className="font-semibold">Volume Total</TableHead >
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead className="font-semibold">Antecipado</TableHead>
          <TableCell>{formatarParaReal(valorAntecipado)}</TableCell>
          <TableCell>{volumeAntecipado}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
