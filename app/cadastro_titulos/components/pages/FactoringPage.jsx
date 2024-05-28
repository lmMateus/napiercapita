"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
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

export default function FactoringPage({ onVoltar, onSubmit }) {
  const { register, watch, handleSubmit } = useForm();
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
      ...dadosGarantia,
      ...data,
    };
    setDadosGarantia(novosDadosGarantia);
    setShowGarantia(true);
  };

  const gravar = (data) => {
    const {data_vencimento, data_transacao, ...rest} = data
    let datas = new Date(data_vencimento);
    const data_vencimento_ISO = datas.toISOString();
    datas = new Date(data_transacao);
    const data_transacao_ISO = datas.toISOString();
    const dadosTitulo = {
      tipo_titulo: "Factoring",
      risco: "Moderado",
      data_vencimento: data_vencimento_ISO,
      data_transacao: data_transacao_ISO,
      dadosGarantia: {...dadosGarantia},
      ...rest,
    };
    console.log(dadosTitulo);
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
          Factoring
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
          <div className="flex flex-col md:flex-row justify-start md:gap-10 mb-3"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-start md:gap-10 mb-3">
          <div className="md:w-1/2">
            <label htmlFor="contrato" className="block mb-1">
              Contrato
            </label>
            <input
              type="text"
              name="contrato"
              id="contrato"
              {...register("contrato")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="contratante" className="block mb-1">
              Contratante
            </label>
            <input
              type="text"
              name="contratante"
              id="contratante"
              {...register("contratante")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-start md:gap-10 mb-3">
          <div className="md:w-1/2">
            <label htmlFor="valor_adiantamento" className="block mb-1">
              Valor do Adiantamento
            </label>
            <input
              type="text"
              name="valor_adiantamento"
              id="valor_adiantamento"
              {...register("valor_adiantamento")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="data_transacao" className="block mb-1">
              Data da Transação
            </label>
            <input
              type="date"
              name="data_transacao"
              id="data_transacao"
              {...register("data_transacao")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 mb-2">
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
