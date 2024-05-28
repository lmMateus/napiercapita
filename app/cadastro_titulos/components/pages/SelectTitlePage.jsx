"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import chequeImg from "@/public/cheque.png";
import credito_tributarioImg from "@/public/credito_tributario.jpg";
import debentureImg from "@/public/debenture.jpg";
import factoringImg from "@/public/factoring.jpg";
import nota_promissoriaImg from "@/public/nota_promissoria.jpg";
import Image from "next/image";

export default function SelectTitlePage({ onClick }) {
  const handleClick = (id) => {
    onClick(id);
  };
  return (
        <div>
          <h1 className="text-center text-2xl font-semibold text-slate-800 mb-4">
            Qual tipo de título gostaria de cadastrar?
          </h1>
          <div className="flex flex-col justify-center xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4 w-full">
            <Card
              onClick={() => handleClick("cheque")}
              className="transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer"
            >
              <CardHeader className="flex items-center ">
                <CardTitle className="text-xl md:text-md 2xl:text-xl text-nowrap">
                  Cheque
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div>
                  <Image
                    src={chequeImg}
                    className="w-28 lg:w-32 xl:w-36"
                    alt="Imagem ilustrativa Cheque"
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              onClick={() => handleClick("credito_tributario")}
              className="transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer"
            >
              <CardHeader className="flex items-center">
                <CardTitle className="text-xl md:text-md 2xl:text-xl text-nowrap ">
                  Crédito Tributário
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div>
                  <Image
                    src={credito_tributarioImg}
                    className="w-28 lg:w-32 xl:w-36"
                    alt="Imagem do Título"
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              onClick={() => handleClick("debenture")}
              className="transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer"
            >
              <CardHeader className="flex items-center">
                <CardTitle className="text-xl md:text-md 2xl:text-xl text-nowrap ">
                  Debenture
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div>
                  <Image
                    src={debentureImg}
                    className="w-28 lg:w-32 xl:w-36"
                    alt="Imagem do Título"
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              onClick={() => handleClick("nota_promissoria")}
              className="transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer"
            >
              <CardHeader className="flex items-center">
                <CardTitle className="text-xl md:text-md 2xl:text-xl text-nowrap ">
                  Nota Promissória
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div>
                  <Image
                    src={nota_promissoriaImg}
                    className="w-28 lg:w-32 xl:w-36"
                    alt="Imagem do Título"
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              onClick={() => handleClick("factoring")}
              className="transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer"
            >
              <CardHeader className="flex items-center">
                <CardTitle className="text-xl md:text-md 2xl:text-xl text-nowrap ">
                  Factoring
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div>
                  <Image
                    src={factoringImg}
                    className="w-28 lg:w-32 xl:w-36"
                    alt="Imagem do Título"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  );
}
