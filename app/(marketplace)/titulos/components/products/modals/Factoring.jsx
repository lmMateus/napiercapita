import { getTitle } from '../../../api/get-title'
import React, { useState, useEffect } from 'react';
import formatDate from '@/app/(marketplace)/lib/formatDate';

const Factoring = (t) =>{
  const [titulo, setTitulo] = useState('')
  const titleProps = t.props
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const _titles = await getTitle(titleProps.cod_titulo, 'factoring');
        setTitulo(_titles);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchTitle();
  },[]);

  if (!titulo || titulo.length === 0) {
    return <div></div>;
  }  
  return (
    <div className="grid md:grid-cols-2 space-y-1 md:space-y-none border-t p-2 border-b
      overflow-auto h-80 md:h-auto">
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Contrato:</span>
          <span className='opacity-75'>{titulo.contrato}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Contratante:</span>
          <span className='opacity-75'>{titulo.contratante}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Valor de adiantamento:</span>
          <span className='opacity-75'>{titulo.valor_adiantamento
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data de transação:</span>
          <span className='opacity-75'>{formatDate(titulo.data_transacao)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Descrição:</span>
          <span className='opacity-75'>{titleProps.descricao}</span>
        </p>
      </div>
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Vencimento:</span>
          <span className='opacity-75'>{formatDate(titleProps.data_vencimento)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Emissor do título:</span>
          <span className='opacity-75'>{titleProps.emissor}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Valor do título:</span>
          <span className='opacity-75'>
            {titleProps.valor_titulo
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Valor da oferta:</span>
          <span className='opacity-75'>
            {titleProps.valor_ofertado
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </p>
      </div>
    </div>
  )
}


export default Factoring;