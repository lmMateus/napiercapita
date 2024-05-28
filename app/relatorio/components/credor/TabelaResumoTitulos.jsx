'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { formatarParaReal } from '../../assets/js/scripts';
import { getValorTotalTitulosAntecipadosCredor } from '../../api/credor/getValorTotalTitulosAntecipadosCredor';
import { getValorTotalTitulosOfertadoCredor } from '../../api/credor/getValorTotalTitulosOfertadoCredor';
import { getVolumeTitulosAntecipadosCredor } from '../../api/credor/getVolumeTitulosAntecipadosCredor';
import { getVolumeTitulosOfertadoCredor } from '../../api/credor/getVolumeTitulosOfertadoCredor';

export default function TabelaResumoTitulos({ codPerfil, dataSelected }) {
  const [valorAntecipado, setValorAntecipado] = useState(0);
  const [volumeAntecipado, setVolumeAntecipado] = useState(0);
  const [valorOfertado, setValorOfertado] = useState(0);
  const [volumeOfertado, setVolumeOfertado] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const valorAntecipado_ = await getValorTotalTitulosAntecipadosCredor(codPerfil, dataSelected);
        const volumeAntecipado_ = await getVolumeTitulosAntecipadosCredor(codPerfil, dataSelected);
        const valorOfertado_ = await getValorTotalTitulosOfertadoCredor(codPerfil, dataSelected);
        const volumeOfertado_ = await getVolumeTitulosOfertadoCredor(codPerfil, dataSelected);

        setValorAntecipado(valorAntecipado_);
        setVolumeAntecipado(volumeAntecipado_);
        setValorOfertado(valorOfertado_);
        setVolumeOfertado(volumeOfertado_);
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
          <TableHead></TableHead>
          <TableHead className="font-semibold">Valor Total</TableHead>
          <TableHead className="font-semibold">Volume Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead className="font-semibold">Antecipado</TableHead>
          <TableCell>{formatarParaReal(valorAntecipado)}</TableCell>
          <TableCell>{volumeAntecipado}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="font-semibold">Ofertado</TableHead>
          <TableCell>{formatarParaReal(valorOfertado)}</TableCell>
          <TableCell>{volumeOfertado}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
