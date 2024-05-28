import { getTitle } from '../../../api/get-title'
import React, { useState, useEffect } from 'react';
import formatDate from '@/app/(marketplace)/lib/formatDate';

const CreditoTributario = (t) =>{
  const [titulo, setTitulo] = useState('')
  const titleProps = t.props
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const _titles = await getTitle(titleProps.cod_titulo, 'credito_tributario');
        setTitulo(_titles);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchTitle();
  }, []);

  const assinatura = () => {
    if(titulo.assinatura_partes) return 'Sim'
    return 'Não'
  }
  const suporte = () =>{
    if(titulo.documentacao_suporte) return 'Sim'
    return 'Não'
  }

  return (
    <div className="grid md:grid-cols-2 space-y-1 md:space-y-none border-t p-2 border-b
      overflow-auto h-80 md:h-auto">
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Assinatura das partes:</span>
          <span className='opacity-75'>{assinatura()}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Natureza do crédito:</span>
          <span className='opacity-75'>{titulo.natureza_credito}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data do início da apuração:</span>
          <span className='opacity-75'>{formatDate(titulo.data_apuracao_inicio)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data do fim da apuração:</span>
          <span className='opacity-75'>{formatDate(titulo.data_apuracao_fim)}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Motivo do crédito:</span>
          <span className='opacity-75'>{titulo.motivo_credito}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Documentação de suporte:</span>
          <span className='opacity-75'>{suporte()}</span>
        </p>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data da solicitação:</span>
          <span className='opacity-75'>{formatDate(titulo.data_solicitacao)}</span>
        </p>
      </div>
      <div className='space-y-1 md:space-y-2'>
        <p className='flex gap-x-1'>
          <span className='font-semibold'>Data do requerimento formal:</span>
          <span className='opacity-75'>{formatDate(titulo.data_requerimento_formal)}</span>
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


export default CreditoTributario;