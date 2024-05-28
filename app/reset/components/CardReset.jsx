import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast";
import { updateSenha } from "../../perfil/api/update-perfil"
import { checkPass } from "../../perfil/api/verificaSenha"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react'
import getCurrentUser from "../../../lib/currentUser"

export default function CardReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
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

  const handleCheckboxReset = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const acessaGerenciarTitulos = () => {
    window.location.assign('/gerenciar-titulos');
  }

  const acessaHome = () => {
    window.location.assign('/');
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Nova senha</CardTitle>
        <CardDescription>Informe e confirme sua nova senha abaixo:</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
                {showPassword ? (
                  <Input
                  type="text"
                  id="senha"
                  placeholder="Digite a sua senha"
                  {...register("senha")}
                  required
                  onChange={handleInputChange}
                />
                ) : (
                  <Input
                  type="password"
                  id="senha"
                  placeholder="Digite a sua senha"
                  {...register("senha")}
                  required
                  onChange={handleInputChange}
                />
                )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termsReset"
                  onCheckedChange={handleCheckboxReset}
                />
                <label
                  htmlFor="termsReset"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Visualizar senha
                </label>
              </div>
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
            <div className="flex flex-col space-y-1.5"></div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmation">Confirme a senha</Label>
                {showConfirmation ? (
                  <Input
                  type="text"
                  id="repetir_senha"
                  placeholder="Digite novamente a sua senha"
                  {...register("repetir_senha")}
                  required
                />
                ) : (
                  <Input
                  type="password"
                  id="repetir_senha"
                  placeholder="Digite novamente a sua senha"
                  {...register("repetir_senha")}
                  required
                />
                )}
            </div>
            {errors.repetir_senha && (
                  <p className="text-red-500 mt-1 text-xs">
                    {errors.repetir_senha.message}
                  </p>
                )}
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termsConfirmation"
                  onCheckedChange={handleCheckboxConfirmation}
                />
                <label
                  htmlFor="termsConfirmation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Visualizar a confirmação de senha
                </label>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" style={{width: '143px'}}>Confirmar</Button>
        <Button style={{width: '143px'}} onClick={acessaHome}>Cancelar</Button>
      </CardFooter>
    </Card>
  )
}