import { getTitle } from '../../../api/get-title'
import React, { useState, useEffect } from 'react';
import formatDate from '@/app/(marketplace)/lib/formatDate';

const Cheque = (t) => {
  const [titulo, setTitulo] = useState('')
  const titleProps = t.props
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const _titles = await getTitle(titleProps.cod_titulo, 'cheque');
        setTitulo(_titles);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchTitle();
  }, []);

  const beneficiario = () => {
    if (titulo.nome_beneficiario == '') return 'Não Especificado'
    return titulo.nome_beneficiario
  }
  const doc_beneficiario = () => {
    if (titulo.doc_beneficiario == '') return 'Não Especificado'
    return titulo.doc_beneficiario
  }
  const assinatura = () => {
    if (titulo.assinatura_emitente) return 'Sim'
    return 'Não'
  }
  return (
    <div className="grid md:grid-cols-2 space-y-1 md:space-y-none border-t p-2 border-b
        overflow-auto h-80 md:h-auto">
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Banco:</span>
          <span className='opacity-75'>{titulo.nome_banco}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Número do banco:</span>
          <span className='opacity-75'>{titulo.num_banco}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data de emissão:</span>
          <span className='opacity-75'>{formatDate(titulo.data_emissao)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Nome do beneficiário:</span>
          <span className='opacity-75'>{beneficiario()}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Documento do beneficiário:</span>
          <span className='opacity-75'>{doc_beneficiario()}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Assinatura do emitente:</span>
          <span className='opacity-75'>{assinatura()}</span>
        </p>
      </div>
      <div className='space-y-1 md:space-y-2'>
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


export default Cheque;