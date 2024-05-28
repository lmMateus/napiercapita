import { getTitle } from '../../../api/get-title'
import React, { useState, useEffect } from 'react';
import formatDate from '@/app/(marketplace)/lib/formatDate';
const Debenture = (t) =>{
  const [titulo, setTitulo] = useState('')
  const titleProps = t.props
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const _titles = await getTitle(titleProps.cod_titulo, 'debenture');
        setTitulo(_titles);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchTitle();
  }, []);

  const assinatura = () => {
    if(titulo.assinatura_emitente) return 'Sim'
    return 'Não'
  }

  if (!titulo || titulo.length === 0) {
    return <div></div>;
  }  
  return (
    <div className="grid md:grid-cols-2 space-y-1 md:space-y-none border-t p-2 border-b
      overflow-auto h-80 md:h-auto">
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Número da debênture:</span>
          <span className='opacity-75'>{titulo.numero}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Assinatura do emitente:</span>
          <span className='opacity-75'>{assinatura()}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Valor nominal:</span>
          <span className='opacity-75'>{titulo.valor_nominal
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data da emissão:</span>
          <span className='opacity-75'>{formatDate(titulo.data_emissao)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Prazo de vencimento:</span>
          <span className='opacity-75'>{formatDate(titulo.prazo_vencimento)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Taxa de juros:</span>
          <span className='opacity-75'>{titulo.taxa_juros}%</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Cláusulas:</span>
          <span className='opacity-75'>{titulo.clausulas}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Resgate antecipado</span>
          <span className='opacity-75'>{titulo.resgate_antecipado
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </p>
      </div>
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Informação da emissão:</span>
          <span className='opacity-75'>{titulo.inf_emissao}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Local de pagamento:</span>
          <span className='opacity-75'>{titulo.local_pagamento}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Descrição:</span>
          <span className='opacity-75'>{titleProps.descricao}</span>
        </p>
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


export default Debenture;