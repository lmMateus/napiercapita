import React from "react";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getCNPJ } from "../api/consultaCNPJ";
import { consultarCEP } from "../api/consultaCEP";
import {
  formatarTelefone,
  formatarNumeroTelefoneCNPJ,
  formatarCapitalSocialCNPJ,
  aplicarMascaraMoedaReal,
  formatarCEP,
  formatarNumeroCEP,
} from "../assets/scripts";
import { getPerfilPJ, getEmail } from "../api/get-perfil";

export default function CadasroPJComponent({ onVoltar, onDataSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const removeSpecialCharacters = (value) => {
    return value.replace(/[^0-9]/g, ""); // Remove todos os caracteres não numéricos
  };

  const removeSpecialCharactersMenosVirgula = (value) => {
    const cleanedValue = value.replace(/[^0-9,]/g, "").replace(/,/g, ".");

    // Converter para float
    return parseFloat(cleanedValue);
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .replace(/^\w|\s\w/g, (letter) => letter.toUpperCase());
  };

  const cadastroPjSchema = z
    .object({
      nome_fantasia: z.string().min(1, "Preencha esse campo."),
      razao_social: z.string().min(1, "Preencha esse campo."),
      capital_social: z.string().min(1, "Preencha esse campo."),
      email: z.string().email("Insira um endereço de e-mail válido"),
      repetir_email: z.string(),
      cnpj: z.string(),
      telefone: z.string().optional(),
      cep: z.string(),
      rua: z.string().min(1, "Preencha esse campo."),
      numero: z.coerce.number(),
      bairro: z.string().min(1, "Preencha esse campo."),
      cidade: z.string().min(1, "Preencha esse campo."),
      uf: z.string().min(1, "Preencha esse campo."),
      complemento: z.string().optional(),
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
      repetir_senha: z.string(),
    })
    .refine((data) => data.email === data.repetir_email, {
      message: "Os endereços de e-mail não coincidem",
      path: ["repetir_email"],
    })
    .refine(
      (data) => {
        const cleanedValue = removeSpecialCharacters(data.cnpj);
        return cleanedValue.length === 14;
      },
      {
        message: "O CNPJ deve ter 16 caracteres numéricos",
        path: ["cnpj"],
      }
    )
    .refine(
      (value) => {
        if (!value.telefone) return true; // Se o valor htmlFor vazio, está tudo bem
        const cleanedValue = removeSpecialCharacters(value.telefone);
        return cleanedValue.length >= 10 && cleanedValue.length <= 12; // Telefone geralmente tem entre 10 e 11 dígitos
      },
      {
        message: "O telefone deve ter entre 10 ou 11 dígitos numéricos",
        path: ["telefone"],
      }
    )
    .refine(
      (value) => {
        const cleanedValue = removeSpecialCharacters(value.cep);
        return cleanedValue.length === 8;
      },
      {
        message: "O CEP deve ter 8 caracteres numéricos",
        path: ["cep"],
      }
    )
    .refine((value) => value.repetir_senha === value.senha, {
      message: "As senhas não coincidem",
      path: ["repetir_senha"],
    })
    .refine(
      (value) => {
        const numericValue = parseFloat(
          removeSpecialCharacters(value.capital_social)
        );
        return numericValue >= 0; // Verifica se o valor é maior ou igual a zero
      },
      {
        message: "O capital social não pode ser um número negativo",
        path: ["capital_social"],
      }
    );

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
  const [dataAPIs, setDataAPIs] = useState({});

  const [submittedData, setSubmittedData] = useState(null);

  const [cnpjExiste, setCnpjExiste] = useState(false);
  const [cnpjInvalido, setCnpjInvalido] = useState(false)

  async function handleChangeCNPJ(cnpj) {
    const cnpjClean = removeSpecialCharacters(cnpj);
    try {
      const perfil = await getPerfilPJ(cnpjClean);
      if (perfil) {
        setCnpjExiste(perfil);
        return;
      }
    } catch (e) {
      console.error("Erro ao acessar o banco:", e);
    }
    try {
      const { data } = await getCNPJ(cnpjClean);
      if (data) {
        setCnpjExiste(false)
        setCnpjInvalido(false)
        const { estabelecimento, razao_social, capital_social } = data;
        setDataAPIs((prevData) => ({
          ...prevData,
          cnpj: data.cnpj_raiz || "",
          email: estabelecimento.email ?? "",
          telefone: estabelecimento
            ? formatarNumeroTelefoneCNPJ(
                (estabelecimento.ddd1 ?? "") + (estabelecimento.telefone1 ?? "")
              )
            : "",
          razao_social: razao_social ? capitalizeFirstLetter(razao_social) : "",
          capital_social: capital_social
            ? formatarCapitalSocialCNPJ(capital_social)
            : "",
          nome_fantasia: estabelecimento.nome_fantasia
            ? capitalizeFirstLetter(estabelecimento.nome_fantasia)
            : "",
          cep: estabelecimento.cep
            ? formatarNumeroCEP(estabelecimento.cep)
            : "",
          rua: estabelecimento.logradouro
            ? capitalizeFirstLetter(estabelecimento.logradouro)
            : "",
          numero: estabelecimento.numero || "",
          bairro: estabelecimento.bairro
            ? capitalizeFirstLetter(estabelecimento.bairro)
            : "",
          cidade: estabelecimento.cidade.nome
            ? capitalizeFirstLetter(estabelecimento.cidade.nome)
            : "",
          uf: estabelecimento.estado.sigla || "",
          complemento: estabelecimento.complemento || "",
        }));
      }
    } catch (error) {
      setCnpjInvalido(true)
    }
  }

  const [cepInvalido, setCepInvalido] =  useState(false)
  async function handleChangeCEP(cep) {
    const cepClean = removeSpecialCharacters(cep);
    try {
      const { data } = await consultarCEP(cepClean);
      if (data) {
        setCepInvalido(false)
        setDataAPIs((prevData) => ({
          ...prevData,
          rua: data.logradouro
            ? capitalizeFirstLetter(data.logradouro)
            : "",
          numero: data.numero || "",
          bairro: data.bairro
            ? capitalizeFirstLetter(data.bairro)
            : "",
          cidade: data.localidade
            ? capitalizeFirstLetter(data.localidade)
            : "",
          uf: data.uf || "",
          complemento: data.complemento || "",
        }));
      }else {
        setCepInvalido(true)
      }
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
    }
  }

  const [emailExiste, setEmailExiste] = useState(false)
  async function handleChangeEmail(email){
    try{
      setEmailExiste(await getEmail(email))
    }catch (e) {
      console.error("Erro ao acessar o banco:", e);
    }
  }

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      telefone: "",
      razao_social: "",
      nome_fantasia: "",
      capital_social: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
      complemento: "",
    },
    resolver: zodResolver(cadastroPjSchema),
  });

  const cnpj = watch("cnpj");
  const cep = watch("cep");

  React.useEffect(() => {
    if (cnpj && cnpj.length === 18) {
      handleChangeCNPJ(cnpj);
      setValue("email", dataAPIs.email);
      setValue("telefone", dataAPIs.telefone);
      setValue("razao_social", dataAPIs.razao_social);
      setValue("nome_fantasia", dataAPIs.nome_fantasia);
      setValue("capital_social", dataAPIs.capital_social);
      setValue("cep", dataAPIs.cep);
      setValue("rua", dataAPIs.rua);
      setValue("numero", dataAPIs.numero, {shouldDirty: true});
      setValue("bairro", dataAPIs.bairro);
      setValue("cidade", dataAPIs.cidade);
      setValue("uf", dataAPIs.uf);
      setValue("complemento", dataAPIs.complemento);
    }
  }, [cnpj]);

  React.useEffect(() => {
    if (cep && cep.length === 9) {
      handleChangeCEP(cep);
      setValue("rua", dataAPIs.rua);
      setValue("bairro", dataAPIs.bairro);
      setValue("cidade", dataAPIs.cidade);
      setValue("uf", dataAPIs.uf);
    }
  }, [cep]);

  const onSubmit = (data) => {
    const cleanedData = {
      ...data,
      cnpj: removeSpecialCharacters(data.cnpj),
      capital_social: data.capital_social.replace("R$", ""),
      cep: removeSpecialCharacters(data.cep),
      telefone: removeSpecialCharacters(data.telefone),
      capital_social: removeSpecialCharactersMenosVirgula(data.capital_social),
      numero: data.numero.toString(),
    };
    setSubmittedData(cleanedData);
    onDataSubmit(cleanedData);
  };

  return (
    <div className="container mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold mb-4">Pessoa Jurídica</h2>
        <p className="mb-2 text-gray-600">
          Campos marcados com * são obrigatórios
        </p>
        <div className="flex flex-col divide-y divide-solid">
          <div className="">
            <h3 className="text-xl mb-4">Dados Cadastrais</h3>

            <div className="flex flex-col justify-around w-full md:flex-row">
              {/* PRIMEIRA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <label htmlFor="cnpj" className="block mb-1 hover">
                    CNPJ*
                  </label>
                  <InputMask
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
                  {cnpjExiste === true && (
                      <strong className="text-red-500 mt-1 text-s">CNPJ já cadastrado!</strong>
                  )}
                  {cnpjInvalido === true && (
                      <strong className="text-red-500 mt-1 text-s">CNPJ inválido!</strong>
                  )}
                  {errors.cnpj && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.cnpj.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email")}
                    onBlur={(e) => handleChangeEmail(e.target.value)}
                    disabled={cnpjExiste || cnpjInvalido}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:border-pink-500 invalid:[&:not(:placeholder-shown):focus]:border-pink-500 
                  invalid:[&:not(:placeholder-shown):focus]:text-pink-600 invalid:[&:not(:placeholder-shown):not(:focus)]:text-pink-600 invalid:[&:not(:placeholder-shown):focus]:ring-pink-500 invalid:[&:not(:placeholder-shown):focus]:outline-none"
                    placeholder=" "
                  />
                  {emailExiste === true && (
                      <strong className="text-red-500 mt-1 text-s">Email já cadastrado!</strong>
                  )}
                  {errors.email && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="repetir_email" className="block mb-1 hover">
                    Repetir E-mail*
                  </label>
                  <input
                    type="email"
                    id="repetir_email"
                    name="repetir_email"
                    {...register("repetir_email")}
                    disabled={emailExiste || cnpjExiste || cnpjInvalido}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:border-pink-500 invalid:[&:not(:placeholder-shown):focus]:border-pink-500 
                  invalid:[&:not(:placeholder-shown):focus]:text-pink-600 invalid:[&:not(:placeholder-shown):not(:focus)]:text-pink-600 invalid:[&:not(:placeholder-shown):focus]:ring-pink-500 invalid:[&:not(:placeholder-shown):focus]:outline-none"
                    placeholder=" "
                  />
                  {errors.repetir_email && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.repetir_email.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="telefone" className="block mb-1 hover">
                    Telefone*
                  </label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    placeholder="(00) 0000-0000"
                    onInput={(e) => formatarTelefone(e)}
                    {...register("telefone")}
                    disabled={emailExiste || cnpjExiste || cnpjInvalido}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
              </div>
              {/* SEGUNDA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4 flex gap-2"></div>
                <div className="mb-4">
                  <label htmlFor="razao_social" className="block mb-1 hover">
                    Razão Social*
                  </label>
                  <input
                    type="text"
                    id="razao_social"
                    name="razao_social"
                    {...register("razao_social")}
                    disabled={emailExiste || cnpjExiste || cnpjInvalido}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.razao_social && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.razao_social.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="nome_fantasia" className="block mb-1 hover">
                    Nome Fantasia*
                  </label>
                  <input
                    type="text"
                    id="nome_fantasia"
                    name="nome_fantasia"
                    {...register("nome_fantasia")}
                    disabled={emailExiste || cnpjExiste || cnpjInvalido}
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
                    type="text"
                    id="capital_social"
                    name="capital_social"
                    placeholder="R$ 0,00"
                    {...register("capital_social")}
                    disabled={emailExiste || cnpjExiste || cnpjInvalido}
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
            <div className="flex flex-col mt-5">
              <h3 className="text-xl mb-4 mt-5">Endereço</h3>
              <div className="flex flex-col justify-around w-full md:flex-row">
                {/* PRIMEIRA COLUNA FORM 2 */}
                <div className="w-full md:w-1/3">
                  <div className="mb-4">
                    <label htmlFor="cep" className="block mb-1 hover">
                      CEP*
                    </label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      placeholder="_____-___"
                      onInput={(e) => {
                        formatarCEP(e);
                      }}
                      {...register("cep")}
                      disabled={emailExiste || cnpjExiste || cnpjInvalido}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {cepInvalido === true && (
                      <strong className="text-red-500 mt-1 text-s">CEP Inválido!</strong>
                  )}
                    {errors.cep && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.cep.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="rua" className="block mb-1">
                      Rua*
                    </label>
                    <input
                      type="text"
                      id="rua"
                      name="rua"
                      {...register("rua")}
                      disabled={emailExiste || cnpjExiste || cnpjInvalido || cepInvalido}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.rua && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.rua.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 flex gap-2">
                    <div className="w-2/5">
                      <label htmlFor="numero" className="block mb-1 hover">
                        Número*
                      </label>
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        {...register("numero")}
                        disabled={emailExiste || cnpjExiste || cnpjInvalido || cepInvalido}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      {errors.numero && (
                        <p className="text-red-500 mt-1 text-xs">
                          {errors.numero.message ?? ""}
                        </p>
                      )}
                    </div>
                    <div className="w-3/5">
                      <label htmlFor="bairro" className="block mb-1 hover">
                        Bairro*
                      </label>
                      <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        {...register("bairro")}
                        disabled={emailExiste || cnpjExiste || cnpjInvalido || cepInvalido}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      {errors.bairro && (
                        <p className="text-red-500 mt-1 text-xs">
                          {errors.bairro.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SEGUNDA COLUNA FORM 2 */}
                <div className="w-full md:w-1/3">
                  <div className="mb-4">
                    <label htmlFor="cidade" className="block mb-1">
                      Cidade*
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      {...register("cidade")}
                      disabled={emailExiste || cnpjExiste || cnpjInvalido || cepInvalido}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.cidade && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.cidade.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="uf" className="block mb-1">
                      Estado*
                    </label>
                    <input
                      type="text"
                      id="uf"
                      name="uf"
                      {...register("uf")}
                      disabled={emailExiste || cnpjExiste || cnpjInvalido || cepInvalido}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.uf && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.uf.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="complemento" className="block mb-1">
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="complemento"
                      name="complemento"
                      {...register("complemento")}
                      disabled={emailExiste || cnpjExiste || cnpjInvalido || cepInvalido}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.complemento && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.complemento.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col justify-around w-full md:flex-row mt-5">
                <div className="md:w-1/3 w-full mb-4">
                  <label htmlFor="senha" className="block mb-1">
                    Senha*
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    name="senha"
                    {...register("senha")}
                    onChange={handleInputChange}
                    disabled={emailExiste || cnpjExiste || cnpjInvalido}
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
                      <p>
                        A senha deve conter pelo menos um caractere especial
                      </p>
                    )}
                  </div>
                  {errors.senha && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.senha.message}
                    </p>
                  )}
                </div>
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
                      disabled={emailExiste || cnpjExiste || cnpjInvalido}
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
        </div>
        <div className="flex flex-row justify-between w-full mb-10">
          <button
            type="button"
            onClick={onVoltar}
            className="rounded-3xl bg-white p-2 text-slate-700 border-slate-600 border-2 transition duration-300 ease-in-out transform hover:shadow-xl hover:bg-slate-600 hover:text-white"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="rounded-3xl bg-slate-600 w-1/5 p-2 text-white text-sm md:text-xl transition duration-300 ease-in-out transform hover:shadow-xl hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
