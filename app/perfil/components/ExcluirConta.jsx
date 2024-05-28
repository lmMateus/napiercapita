import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deletePerfil } from "../api/delete-perfil";

const ExcluirConta = ({ perfil }) => {

  const aceitaTerm = z.object({
    aceita: z.boolean()
    .refine((value) => value === true, {
      message: "Marque a caixa de seleção para prosseguir",
    }),
  });

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(aceitaTerm), // Resolver de Zod para react-hook-form
    defaultValues: {
      aceita: false,
    },
  });

  const onSubmit = () => {
    try {
      deletePerfil(perfil.cod_perfil)
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col divide-y divide-solid">
          <div>
            <h6 className="text-lg mb-4">Remover conta</h6>
            <div className="items-center flex flex-col">
              <div className="gap-x-1 flex md:w-1/2 mt-5">
                <input
                  type="checkbox"
                  id="aceita"
                  name="aceita"
                  {...register("aceita")} />
                <label htmlFor="aceita">Tem certeza que deseja excluir sua conta?</label>
              </div>
              {errors.aceita && (
                <p className="text-red-500 mt-1 text-xs">
                  {errors.aceita.message}
                </p>
              )}
              <div className="gap-x-1 flex justify-center md:w-1/2 mt-5">
                <p className="text-sm">
                  Esteja ciente que alguns dados referentes a movimentação dos títulos relacionados à sua conta continuarão armazenados em nosso sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end w-full mb-10">
          <button
            type="submit"
            className="rounded-3xl bg-slate-600 md:w-1/5 p-2 text-white 
            text-sm md:text-xl transition duration-300 ease-in-out 
            transform hover:shadow-xl hover:bg-blue-700">
            Excluir
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExcluirConta;
