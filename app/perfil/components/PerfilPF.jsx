import React, { useEffect } from "react";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PerfilPF = ({ perfil }) => {

  const PfSchema = z
    .object({
      nome: z.string().min(1, "Preencha esse campo."),
      data_nascimento: z.coerce.date(),
      rg: z.string(),
      cpf: z.string(),
    });

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  const formatRG = (rg) => {
    return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  };
  const formatDate = (date) => {
    const data = new Date(date);
    const year = data.getFullYear();
    const month = (data.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam em zero, então é necessário adicionar 1
    const day = data.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    return `${year}-${month}-${day}`;    
  };

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: perfil.nome,
      data_nascimento: formatDate(perfil.data_nascimento),
      rg: formatRG(perfil.rg),
      cpf: formatCPF(perfil.cpf)
    },
    resolver: zodResolver(PfSchema), // Resolver de Zod para react-hook-form
  });
  return (
    <div className="container mx-auto py-4">
      <form >
        <div className="flex flex-col divide-y divide-solid">
          <div>
            <h6 className="text-lg mb-4">Dados cadastrais</h6>
            <div className="flex flex-col justify-around w-full md:flex-row">
              {/* PRIMEIRA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <label htmlFor="nome" className="block mb-1 hover">
                    Nome Completo*
                  </label>
                  <input
                    disabled
                    type="text"
                    {...register("nome")}
                    required
                    className="w-full px-4 py-2 border rounded-md
                     focus:outline-none focus:border-blue-500
                     pointer-events-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.nome && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="data_nascimento"
                    className="block mb-1 hover truncate overflow-hidden"
                  >
                    Data de Nascimeto
                  </label>
                  <input
                    disabled
                    type="date"
                    id="data_nascimento"
                    name="data_nascimento"
                    {...register("data_nascimento")}
                    required
                    className="w-full px-4 py-2 border rounded-md
                       focus:outline-none focus:border-blue-500
                       pointer-events-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.data_nascimento && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.data_nascimento.message}
                    </p>
                  )}
                </div>
              </div>
              {/* SEGUNDA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <div>
                    <label htmlFor="rg" className="block mb-1 hover">
                      RG
                    </label>
                    <InputMask
                      disabled
                      type="text"
                      id="rg"
                      name="rg"
                      mask="__.___.___-_"
                      replacement={{ _: /\d/ }}
                      placeholder="__.___.___-__"
                      {...register("rg")}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.rg && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.rg.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="cpf" className="block mb-1 hover">
                    CPF
                  </label>
                  <InputMask
                    disabled
                    type="text"
                    id="cpf"
                    name="cpf"
                    mask="___.___.___-__"
                    replacement={{ _: /\d/ }}
                    placeholder="___.___.___-__"
                    {...register("cpf")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.cpf && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PerfilPF