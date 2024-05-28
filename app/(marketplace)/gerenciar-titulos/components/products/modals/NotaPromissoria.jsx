import { getTitle } from '../../../api/get-title'
import React, { useState, useEffect } from 'react';
import formatDate from '@/app/(marketplace)/lib/formatDate';

const NotaPromissoria = (t) =>{
  const [titulo, setTitulo] = useState('')
  const titleProps = t.props  
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const _titles = await getTitle(titleProps.cod_titulo, 'nota_promissoria');
        setTitulo(_titles);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchTitle();
  },[]);
  
  return (
    <div className="grid md:grid-cols-2 space-y-1 md:space-y-none border-t p-2 border-b
        overflow-auto h-80 md:h-auto">
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Número:</span>
          <span className='opacity-75'>{titulo.numero_promissoria}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Cláusula a ordem:</span>
          <span className='opacity-75'>{titulo.clausula_a_ordem}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Local da emissão:</span>
          <span className='opacity-75'>{titulo.local_emissao}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data de emissão:</span>
          <span className='opacity-75'>{formatDate(titulo.data_emissao)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Nome do beneficiário:</span>
          <span className='opacity-75'>{titulo.nome_beneficiario}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Documento do beneficiário:</span>
          <span className='opacity-75'>{titulo.doc_beneficiario}</span>
        </p>
      </div>
      <div className='space-y-1 md:space-y-2'>
      <p className='flex gap-x-1'>
          <span className='font-semibold'>Local do pagamento:</span>
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


export default NotaPromissoria;