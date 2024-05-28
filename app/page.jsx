"use client"
import NavbarHomeComponent from "@/app/components/NavbarHomeComponent";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import React from "react";
import FooterHomeComponent from "@/app/components/FooterHomeComponent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ChequeImg from "@/public/cheque.png"
import CreditoTributarioImg from "@/public/credito_tributario.jpg"
import DebentureImg from "@/public/debenture.jpg"
import FactoringImg from "@/public/factoring.jpg"
import NotaPromissoriaImg from "@/public/nota_promissoria.jpg"
import MulherSinalDinheiroImg from "@/public/mulher_sinal_dinheiro.jpg"
import PilhaMoedaImg from "@/public/pilha_moeda.jpg"

import Autoplay from "embla-carousel-autoplay"

export default function Home() {

  const CarouselMessage = [
    "Prepare-se para o futuro financeiro hoje mesmo!",
    "Tenha o dinheiro que você precisa quando mais precisa.",
    "Antecipe seus ganhos e construa um futuro financeiro sólido.",
    "Planeje hoje para colher os frutos amanhã.",
    "Faça hoje o que garantirá sua segurança financeira amanhã.",
    "No mundo dos negócios, antecipar recebíveis é a chave para o crescimento sustentável.",
    "Antecipe sua renda e abra caminhos para suas metas financeiras.",
    "Planeje com antecedência e transforme seus sonhos em realidade.",
  ];

  const TitulosCard = [
    {
      nome: "Título de Crédito",
      desc: "Desbloqueie o valor do seu Crédito Tributário e libere recursos para investir no crescimento do seu negócio. Negocie agora mesmo na nossa plataforma.",
      imageTitulo: { CreditoTributarioImg }
    },
    {
      nome: "Cheque",
      desc: "Otimize seu fluxo de caixa transformando seus cheques em dinheiro disponível imediato. Negocie de forma transparente e eficiente conosco.",
      imageTitulo: { ChequeImg }
    },
    {
      nome: "Nota Promissória",
      desc: "Transforme suas notas promissórias em capital disponível para impulsionar sua empresa. Negocie com facilidade e segurança através da nossa plataforma.",
      imageTitulo: { NotaPromissoriaImg }
    },
    {
      nome: "Debênture",
      desc: "Mantenha a integridade contratual e negocie suas debêntures com agilidade e confiança. Descubra as vantagens de negociar na nossa plataforma.",
      imageTitulo: { DebentureImg }
    },
    {
      nome: "Factoring",
      desc: "Potencialize sua liquidez transferindo suas contas a receber para o factoring. Negocie seus títulos com rapidez e praticidade conosco.",
      imageTitulo: { FactoringImg }
    },
  ];


  return (
    <>
      <NavbarHomeComponent />
      <main className="grid grid-cols-1 justify-center">
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 bg-gradient-to-l from-slate-600 to-slate-800">
            <Image src={MulherSinalDinheiroImg} alt="Imagem de uma mulher fazendo sinal de dinheiro" className="w-full max-h-min ll:max-h-[780px] col-span-1 xl:col-span-2" />
            <div className="flex text-slate-100 col-span-1 xl:col-span-2 text-md md:text-lg xl:text-xl items-center justify-center lg:text-center text-start md:px-12 px-6 py-12">
              <p>
                Transforme o sonho empresarial em realidade com a antecipação inteligente de recebíveis. Fortaleça sua posição financeira, impulsione o crescimento e liberte-se das amarras do futuro com a nossa plataforma.</p>
            </div>

          </div>

        </div>
        <div className="grid grid-cols-1 px-2 my-4">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {Array.from({ length: CarouselMessage.length }).map((_, index) => (
                <CarouselItem key={index} className="basis-[68%] md:basis-[38%] lg:basis-[28%] xl:basis-[18%]">
                  <Card className="bg-gradient-to-b from-slate-50 to-slate-300 border-slate-100	">
                    <CardContent className="flex aspect-square items-center justify-center p-6 text-lg md:text-xl text-slate-700">
                      <p>{CarouselMessage[index]}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute right-0 mr-4"/>
          </Carousel>
        </div>
        
        <div className="bg-gradient-to-l from-slate-600 to-slate-800 px-8 py-12">
          <h2 className="text-slate-100 text-2xl pb-4">Tipos de Negociação</h2>
          <h4 className="text-slate-100 text-md lg:text-lg pb-6">
            Descubra as oportunidades que nossa plataforma oferece ao desbloquear o valor dos seus recebíveis</h4>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TitulosCard.map((tituloCard, index) => {
              return Object.keys(tituloCard["imageTitulo"]).map((key) => (
                <Card key={index} className="flex flex-col items-center justify-center">
                  <CardContent>
                    <div className="flex flex-col items-center justify-center">
                      <Image src={tituloCard["imageTitulo"][key]} className="w-28 lg:w-32 xl:w-36 pt-2" alt="Imagem do Título"/>
                      <h2 className="text-slate-800 text-lg font-medium text-center">{tituloCard["nome"]}</h2>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-slate-800 text-md text-center">{tituloCard["desc"]}</p>
                  </CardFooter>
                </Card>
              ));
            })}
          </div>

        </div>
      </main>
      <FooterHomeComponent />
    </>
  );
}