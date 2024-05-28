"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ShieldPlus } from "lucide-react";
import Bancaria from "./garantias/Bancaria";
import Automovel from "./garantias/Automovel";
import Imobiliaria from "./garantias/Imobiliaria";
import Outro from "./garantias/Outro";
import { ExibirGarantia } from "./garantias/ExibirGarantia";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postTitulo } from "../../api/post-titulos";

export default function ChequePage({ onVoltar }) {
  const { register, watch, handleSubmit } = useForm();
  const selectedValue = watch("assinatura_emitente");
  const [showGarantia, setShowGarantia] = useState(false);
  const [dadosGarantia, setDadosGarantia] = useState({});

  const handleGuaranteeChange = (value) => {
    setDadosGarantia({
      tipo_garantia: value,
    });
    setShowGarantia(false);
  };

  const handleDataSubmitGarantia = (data) => {
    const novosDadosGarantia = {
      ...dadosGarantia, // Dados existentes
      ...data, // Novos dados
    };
    setDadosGarantia(novosDadosGarantia);
    setShowGarantia(true);
  };

  const onSubmit = (data) => {
    const { assinatura_emitente, data_vencimento, data_emissao, ...rest } =
      data;
    let datas = new Date(data_vencimento);
    const data_vencimento_ISO = datas.toISOString();
    datas = new Date(data_emissao);
    const data_emissao_ISO = datas.toISOString();
    const assinatura = assinatura_emitente === "sim";
    const dadosTitulo = {
      tipo_titulo: "Cheque",
      risco: "Moderado",
      data_vencimento: data_vencimento_ISO,
      data_emissao: data_emissao_ISO,
      dadosGarantia: { ...dadosGarantia },
      assinatura_emitente: assinatura,
      ...rest,
    };
    console.log(dadosTitulo);
    postTitulo(dadosTitulo);
  };

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <button
          type="button"
          className="mb-2 w-20 rounded-3xl bg-white p-2 text-sm md:text-md text-slate-700 border-slate-600 border-2 transition duration-300 ease-in-out transform hover:shadow-xl hover:bg-slate-600 hover:text-white"
          onClick={onVoltar}
        >
          Voltar
        </button>
        <h1 className="text-2xl md:text-md 2xl:text-3xl font-bold mb-2">
          Cheque
        </h1>
        <div className=" flex flex-col">
          <div className="grid grid-cols-1 gap-x-2 w-full">
            <div className="flex flex-col md:flex-row justify-start md:gap-10 mb-3">
              <div className="w-full md:w-1/3 mb-5 self-center">
                <label htmlFor="valor_titulo" className="block mb-1">
                  Valor do Título
                </label>
                <input
                  type="text"
                  name="valor_titulo"
                  id="valor_titulo"
                  required
                  {...register("valor_titulo")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-1/3 mb-5 self-center">
                <label htmlFor="data_vencimento" className="block mb-1">
                  Data de Vencimento
                </label>
                <input
                  type="date"
                  name="data_vencimento"
                  id="data_vencimento"
                  required
                  {...register("data_vencimento")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="border rounded-lg p-2 mb-3 w-full">
              <h2 className="font-semibold text-xl mb-2">Emissor</h2>
              <div className="flex flex-row justify-start gap-5">
                <div className="mb-3 md:w-2/3">
                  <label htmlFor="emissor" className="block mb-1">
                    Nome do Emissor
                  </label>
                  <input
                    type="text"
                    name="emissor"
                    id="emissor"
                    required
                    {...register("emissor")}
                    className="grow w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-3 md:w-1/3">
                  <label htmlFor="doc_emissor" className="block mb-1">
                    Documento do Emissor
                  </label>
                  <input
                    type="text"
                    name="doc_emissor"
                    id="doc_emissor"
                    required
                    {...register("doc_emissor")}
                    className="grow w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 mb-5">
              <label htmlFor="num_cheque" className="block mb-1">
                Descrição
              </label>
              <Textarea {...register("descricao", { required: true })} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-2 w-full">
          <div className="flex flex-col md:flex-row justify-start md:gap-10 mb-3">
            <div className="w-full mb-5">
              <label htmlFor="num_cheque" className="block mb-1">
                Número do Cheque
              </label>
              <input
                type="text"
                name="num_cheque"
                id="num_cheque"
                required
                {...register("num_cheque")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="data_emissao" className="block mb-1">
                Data de Emissão
              </label>
              <input
                type="date"
                name="data_emissao"
                id="data_emissao"
                required
                {...register("data_emissao")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="border rounded-lg p-2 mb-3 w-full">
            <h2 className="font-semibold text-xl mb-2">Banco</h2>
            <div className="flex flex-row justify-start gap-5">
              <div className="mb-3 w-1/3">
                <label htmlFor="num_banco" className="block mb-1">
                  Número
                </label>
                <input
                  type="text"
                  name="num_banco"
                  id="num_banco"
                  required
                  {...register("num_banco", { maxLength: 3 })}
                  className="grow w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-3 md:w-2/3">
                <label htmlFor="nome_banco" className="block mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome_banco"
                  id="nome_banco"
                  required
                  {...register("nome_banco")}
                  className="grow w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex md:flex-row md:gap-5 flex-col">
            <div className="mb-3">
              <label htmlFor="doc_beneficiario" className="block mb-1">
                Documento do Beneficiário
              </label>
              <input
                type="text"
                name="doc_beneficiario"
                id="doc_beneficiario"
                required
                {...register("doc_beneficiario")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nome_beneficiario" className="block mb-1">
                Nome do Beneficiário
              </label>
              <input
                type="text"
                name="nome_beneficiario"
                id="nome_beneficiario"
                required
                {...register("nome_beneficiario")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col mb-3 md:w-1/3">
              <label htmlFor="assinatura_emitente">
                Possui assinatura do emitente?
              </label>
              <div className="flex space-x-2">
                <input
                  type="radio"
                  id="sim"
                  value="sim"
                  {...register("assinatura_emitente")}
                  className="hidden"
                />
                <label
                  htmlFor="sim"
                  className={`rounded-full px-4 py-1.5 m-3 cursor-pointer ${
                    selectedValue === "sim"
                      ? "bg-slate-600 text-white"
                      : "bg-slate-200"
                  }`}
                >
                  Sim
                </label>

                <input
                  type="radio"
                  id="nao"
                  value="nao"
                  {...register("assinatura_emitente")}
                  className="hidden"
                />
                <label
                  htmlFor="nao"
                  className={`rounded-full px-4 py-1.5 m-3 cursor-pointer ${
                    selectedValue === "nao"
                      ? "bg-slate-600 text-white"
                      : "bg-slate-200"
                  }`}
                >
                  Não
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mb-2">
            {!showGarantia && (
              <div className="flex flex-col md:flex-row gap-5">
                <Select onValueChange={handleGuaranteeChange}>
                  <SelectTrigger className="w-full md:w-1/4 bg-slate-800 text-white">
                    <ShieldPlus />
                    Adicionar garantia
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bancaria">Bancaria</SelectItem>
                    <SelectItem value="imobiliaria">Imobiliaria</SelectItem>
                    <SelectItem value="automovel">Automovel</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {!showGarantia && dadosGarantia.tipo_garantia === "bancaria" && (
              <Bancaria
                register={register}
                onDataSubmit={handleDataSubmitGarantia}
              />
            )}
            {!showGarantia && dadosGarantia.tipo_garantia === "imobiliaria" && (
              <Imobiliaria
                register={register}
                onDataSubmit={handleDataSubmitGarantia}
              />
            )}
            {!showGarantia && dadosGarantia.tipo_garantia === "automovel" && (
              <Automovel
                register={register}
                onDataSubmit={handleDataSubmitGarantia}
              />
            )}
            {!showGarantia && dadosGarantia.tipo_garantia === "outro" && (
              <Outro
                register={register}
                onDataSubmit={handleDataSubmitGarantia}
              />
            )}
          </div>
          {showGarantia && <ExibirGarantia data={dadosGarantia} />}
        </div>
        <div className="mb-8 md:w-1/3 mt-4">
          <label htmlFor="valor_ofertado" className="block mb-1 font-bold">
            Por qual valor gostaria de ofertar seu título?
          </label>
          <input
            type="text"
            name="valor_ofertado"
            id="valor_ofertado"
            required
            {...register("valor_ofertado")}
            className="grow w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-row justify-end w-full">
          <button
            type="submit"
            className="rounded-3xl bg-slate-600 md:w-1/5 p-2 text-white w-full text-sm md:text-xl transition duration-300 ease-in-out transform hover:shadow-xl hover:bg-slate-700"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
