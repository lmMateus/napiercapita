import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PerfilPJ({ perfil }) {  


  const cadastroPjSchema = z
    .object({
      nome_fantasia: z.string().min(1, "Preencha esse campo."),
      razao_social: z.string().min(1, "Preencha esse campo."),
      capital_social: z.string().min(1, "Preencha esse campo."),
      cnpj: z.string(),      
    });

    function formatCNPJ(cnpj) {
      const cleanedCNPJ = cnpj.replace(/\D/g, '');
      const formattedCNPJ = cleanedCNPJ.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          '$1.$2.$3/$4-$5'
      );  
      return formattedCNPJ;
  }

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      razao_social: perfil.razao_social,
      nome_fantasia: perfil.nome_fantasia,
      capital_social: perfil.capital_social
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      cnpj: formatCNPJ(perfil.cnpj)
    },
    resolver: zodResolver(cadastroPjSchema),
  });       
  return (
    <div className="container mx-auto py-12">
      <form>
        <div className="flex flex-col divide-y divide-solid">
          <div className="">
          <h6 className="text-lg mb-4">Dados cadastrais</h6>
            <div className="flex flex-col justify-around w-full md:flex-row">
              {/* PRIMEIRA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <label htmlFor="cnpj" className="block mb-1 hover">
                    CNPJ*
                  </label>
                  <input
                    disabled
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    mask="__.___.___/____-__"
                    replacement={{ _: /\d/ }}
                    placeholder="__.___.___/____-__"
                    {...register("cnpj")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.cnpj && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.cnpj.message}
                    </p>
                  )}
                </div>    
                <div className="mb-4">
                  <label htmlFor="razao_social" className="block mb-1 hover">
                    Razão Social*
                  </label>
                  <input
                    disabled
                    type="text"
                    id="razao_social"
                    name="razao_social"
                    {...register("razao_social")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.razao_social && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.razao_social.message}
                    </p>
                  )}
                </div>
              </div>
              {/* SEGUNDA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">                
                <div className="mb-4">
                  <label htmlFor="nome_fantasia" className="block mb-1 hover">
                    Nome Fantasia*
                  </label>
                  <input
                    disabled
                    type="text"
                    id="nome_fantasia"
                    name="nome_fantasia"
                    {...register("nome_fantasia")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.nome_fantasia && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.nome_fantasia.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="capital_social" className="block mb-1 hover">
                    Capital Social*
                  </label>
                  <input
                    disabled
                    type="text"
                    id="capital_social"
                    name="capital_social"
                    placeholder="R$ 0,00"
                    {...register("capital_social")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.capital_social && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.capital_social.message}
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
