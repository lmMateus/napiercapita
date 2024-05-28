import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { checkPass } from "../api/verificaSenha";
import { updateSenha } from "../api/update-perfil";
import { useToast } from "@/components/ui/use-toast";

const RedefinirSenha = ({ perfil }) => {
  const [showPassword, setShowPassword] = useState(false);
  const removeSpecialCharacters = (value) => {
    return value.replace(/[^0-9]/g, ""); // Remove todos os caracteres não numéricos
  };

  const redefineSenha = z
    .object({
      senha: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
          "A senha deve conter pelo menos um caractere especial"
        ),
      senha_antiga: z.string(),
      repetir_senha: z.string(),
    })
    .refine((value) => value !== undefined, {
      message: "Preencha esse campo.",
    })
    .refine((value) => checkPass(value.senha_antiga, perfil.senha), {
      message: "Senha inválida",
      path: ["senha_antiga"],
    })
    .refine((value) => value.repetir_senha === value.senha, {
      message: "As senhas não coincidem",
      path: ["repetir_senha"],
    });

  const [visibleRequirements, setVisibleRequirements] = useState({
    length: true,
    uppercase: true,
    lowercase: true,
    number: true,
    specialChar: true,
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    setVisibleRequirements({
      length: value.length < 8,
      uppercase: !/[A-Z]/.test(value),
      lowercase: !/[a-z]/.test(value),
      number: !/\d/.test(value),
      specialChar: !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
    });
  };

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(redefineSenha), // Resolver de Zod para react-hook-form
  });
  const [submittedData, setSubmittedData] = useState(null);
  const { toast } = useToast()
  const onSubmit = (data) => {
    try {
      updateSenha(perfil.cod_perfil, data.senha)
      setTimeout(() => {          
        toast({
          title: 'Atualizado!',
          description: "Sua senha foi atualizado com sucesso!",
        }) 
      }, 400);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col divide-y divide-solid">
          <div>
            <h6 className="text-lg mb-4">Redefinir senha</h6>
            <div className="flex flex-col justify-center w-full md:flex-row mt-5">
              <div className="md:w-1/3 w-full mb-4">
                <label htmlFor="senha_antiga" className="block mb-1">
                  Senha antiga
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha_antiga"
                  name="senha_antiga"
                  {...register("senha_antiga")}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 -top-10 right-0 flex items-center px-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-gray-500" />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.senha_antiga && (
                  <p className="text-red-500 mt-1 text-xs">
                    {errors.senha_antiga.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center w-full md:flex-row mt-5">
              <div className="md:w-1/3 w-full mb-4">
                <label htmlFor="senha" className="block mb-1">
                  Nova senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  name="senha"
                  {...register("senha")}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 -top-10 right-0 flex items-center px-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-gray-500" />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {visibleRequirements.length && (
                    <p>A senha deve ter no mínimo 8 caracteres</p>
                  )}
                  {visibleRequirements.uppercase && (
                    <p>A senha deve conter pelo menos uma letra maiúscula</p>
                  )}
                  {visibleRequirements.lowercase && (
                    <p>A senha deve conter pelo menos uma letra minúscula</p>
                  )}
                  {visibleRequirements.number && (
                    <p>A senha deve conter pelo menos um número</p>
                  )}
                  {visibleRequirements.specialChar && (
                    <p>A senha deve conter pelo menos um caractere especial</p>
                  )}
                </div>
                {errors.senha && (
                  <p className="text-red-500 mt-1 text-xs">
                    {errors.senha.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center w-full md:flex-row mt-5">
              <div className="md:w-1/3 w-full mb-4">
                <label htmlFor="repetir_senha" className="block mb-1">
                  Repetir Senha*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="repetir_senha"
                    name="repetir_senha"
                    {...register("repetir_senha")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-gray-500" />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.repetir_senha && (
                  <p className="text-red-500 mt-1 text-xs">
                    {errors.repetir_senha.message}
                  </p>
                )}
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
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}


export default RedefinirSenha;