import Image from 'next/image'
import ChequeImage from '/public/cheque.png'
import NotaPromissoriaImage from '/public/nota_promissoria.jpg'
import DebentureImage from '/public/debenture.jpg'
import FactoringImage from '/public/factoring.jpg'
import CreditoTributarioImage from '/public/credito_tributario.jpg'
import formatDate from '@/app/(marketplace)/lib/formatDate';
import React from 'react';
import Cheque from './modals/Cheque'
import CreditoTributario from './modals/CreditoTributario'
import Debenture from './modals/Debenture'
import Factoring from './modals/Factoring'
import NotaPromissoria from './modals/NotaPromissoria'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function TitleCard(titles) {
  const titulos = titles.props;
  const renderImage = (tipoTitulo) => {
    switch (tipoTitulo) {
      case 'Cheque':
        return ChequeImage;
      case 'Nota Promissória':
        return NotaPromissoriaImage;
      case 'Debênture':
        return DebentureImage;
      case 'Factoring':
        return FactoringImage;
      case 'Crédito Tributário':
        return CreditoTributarioImage;
      default:
        return '/factoring.jpg'; // Caminho para uma imagem padrão
    }
  };

  const renderTitleModal = (title) => {
    switch (title.tipo_titulo) {
      case 'Cheque':
        return <Cheque props={title} />;
      case 'Nota Promissória':
        return <NotaPromissoria props={title} />;
      case 'Debênture':
        return <Debenture props={title} />;
      case 'Factoring':
        return <Factoring props={title} />;
      case 'Crédito Tributário':
        return <CreditoTributario props={title} />;
    }
  }

  const renderTitles = () => {
    if (!titulos || titulos.length === 0) {
      return <div></div>;
    }
    return titulos.map((title) => (
      <Dialog key={title.cod_titulo}>
        <DialogTrigger>
          <div className="group transition rounded-xl ease-in-out delay-10 duration-100
          hover:-translate-y-1 hover:scale-100 shadow-md border-t-2 border-gray-50
          grid md:grid-cols-3 space-y-4 p-1 min-h-40 z-10">
            <div className="w-full overflow-hidden flex justify-center">
              <div className="grid grid-flow-row">
                <p className="justify-self-center text-gray-900/40">
                  {title.tipo_titulo}
                </p>
                <div>
                  <Image
                    width={200} // Defina uma largura apropriada
                    height={200} // Defina uma altura apropriada
                    src={renderImage(title.tipo_titulo)}
                    alt="Imagem do título"
                    title={title.tipo_titulo}
                    priority
                    className="w-full object-contain object-center group-hover:opacity-70 h-24 md:h-28"
                  />
                </div>
              </div>
            </div>
            <div className="sm:gap-y-5 text-gray-700 p-1 pl-2">
              <p><span>{title.descricao}</span></p>
              <p>Vencimento: <span>{formatDate(title.data_vencimento)}</span></p>
            </div>
            <div className="place-contet-start text-gray-700 
              grid sm:pb-3 p-1 pl-2">
              <p>
                <span>Emissor: </span>
                <span>{title.emissor}</span>
              </p>
              <div>
                <p>
                  <span>Valor do título: </span>
                  <span>{title.valor_titulo
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </p>
                <p>
                  <span>Valor ofertado: </span>
                  <span> {title.valor_ofertado
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </p>
                <p className="font-semibold">
                  Lucro: {(title.valor_titulo - title.valor_ofertado)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-screen">
          <DialogHeader>
            <div className='grid grid-cols-3 divide-x place-items-center'>
              <DialogDescription><b>Título:</b> {title.tipo_titulo}</DialogDescription>
              <DialogDescription>
                <Popover>
                  <PopoverTrigger>Ver Perfil</PopoverTrigger>
                  <PopoverContent>
                    <div className=''>
                      <p>
                        {title.perfil.tipo_persona === 'pessoa_fisica'
                          ? `Nome: ${title.perfil.pessoa_fisica.nome}`
                          : `Razão social: ${title.perfil.pessoa_juridica.razao_social}`}
                      </p>
                      <p>
                        {title.perfil.tipo_persona === 'pessoa_fisica'
                          ? ''
                          : `Documento: ${title.perfil.pessoa_juridica.cnpj}`}
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </DialogDescription>
              <DialogDescription
                className={`text-red-500 
                ${title.risco == 'Alto'
                    ? 'text-red-500'
                    : title.risco == 'Moderado'
                      ? 'text-amber-500'
                      : 'text-green-500'}`}>
                <Popover>
                  <PopoverTrigger>
                    <span className='text-slate-500'>Risco: </span>
                    {title.risco}
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className=''>
                      {title.risco == 'Alto'
                        ? 'O título NÃO contém garantia + O capital social do emissor é MENOR que o valor do título!'
                        : title.risco == 'Baixo'
                          ? 'O título contém garantia + O capital social do emissor é MAIOR que o valor do título!'
                          : title.garantia == null
                            ? 'O título NÃO contém garantia + O capital social do emissor é MAIOR que o valor do título!'
                            : 'O título contém garantia + O capital social do emissor é MENOR que o valor do título!'}
                    </div>
                  </PopoverContent>
                </Popover>
              </DialogDescription>
            </div>
          </DialogHeader>
          {renderTitleModal(title)}
          <DialogFooter>
            <Button>Antecipar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ));
  };

  return (
    <>
      <div className='gap-y-4 xl:gap-x-5 xl:gap-y-4 grid xl:grid-cols-2'>
        {renderTitles()}
      </div>
    </>);
}