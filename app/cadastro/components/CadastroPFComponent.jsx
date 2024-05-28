import React from "react";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { consultarCEP } from "../api/consultaCEP";
import { formatarCEP } from "../assets/scripts";
import { getPerfilPF, getEmail } from "../api/get-perfil";

export default function CadasroPFComponent({ onVoltar, onDataSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const removeSpecialCharacters = (value) => {
    return value.replace(/[^0-9]/g, ""); // Remove todos os caracteres não numéricos
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .replace(/^\w|\s\w/g, (letter) => letter.toUpperCase());
  };

  const cadastroPfSchema = z
    .object({
      nome: z.string().min(1, "Preencha esse campo."),
      email: z.string().email("Insira um endereço de e-mail válido"),
      repetir_email: z.string(),
      data_nascimento: z.coerce.date(),
      rg: z.string(),
      cpf: z.string(),
      telefone: z.string().optional(),
      celular: z.string(),
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
        data = new Date(data.data_nascimento);
        const now = new Date();
        const minDate = new Date(
          now.getFullYear() - 150,
          now.getMonth(),
          now.getDate()
        );
        const maxDate = new Date(
          now.getFullYear() - 18,
          now.getMonth(),
          now.getDate()
        );
        return data >= minDate && data <= maxDate;
      },
      {
        message: `Você deve ter mais de 18 anos`,
        path: ["data_nascimento"],
      }
    )
    .refine(
      (data) => {
        const cleanedValue = removeSpecialCharacters(data.rg);
        return cleanedValue.length === 9;
      },
      {
        message: "O RG deve ter 9 caracteres numéricos",
        path: ["rg"],
      }
    )
    .refine(
      (value) => {
        const cleanedValue = removeSpecialCharacters(value.cpf);
        return cleanedValue.length === 11;
      },
      {
        message: "O CPF deve ter 11 caracteres numéricos",
        path: ["cpf"],
      }
    )
    .refine(
      (value) => {
        if (!value.telefone) return true; // Se o valor for vazio, está tudo bem
        const cleanedValue = removeSpecialCharacters(value.telefone);
        return cleanedValue.length >= 10 && cleanedValue.length <= 11; // Telefone geralmente tem entre 10 e 11 dígitos
      },
      {
        message: "O telefone deve ter entre 10 dígitos numéricos",
        path: ["telefone"],
      }
    )
    .refine(
      (value) => {
        const cleanedValue = removeSpecialCharacters(value.celular);
        return cleanedValue.length === 11; // Celular geralmente tem 11 dígitos
      },
      {
        message: "O celular deve ter 11 dígitos numéricos",
        path: ["celular"],
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
    .refine((value) => value !== undefined, {
      message: "Preencha esse campo.",
    })
    .refine((value) => value.repetir_senha === value.senha, {
      message: "As senhas não coincidem",
      path: ["repetir_senha"],
    });

  const [dataAPIs, setDataAPIs] = useState({});
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
    resolver: zodResolver(cadastroPfSchema), // Resolver de Zod para react-hook-form
  });
  const [submittedData, setSubmittedData] = useState(null);

  const cep = watch("cep");
  React.useEffect(() => {
    if (cep && cep.length === 9) {
      handleChangeCEP(cep);
      setValue("rua", dataAPIs.rua);
      setValue("bairro", dataAPIs.bairro);
      setValue("cidade", dataAPIs.cidade);
      setValue("uf", dataAPIs.uf);
      setValue("complemento", dataAPIs.complemento);
    }
  });


  const [emailExiste, setEmailExiste] = useState(false)
  async function handleChangeEmail(email){
    try{
      setEmailExiste(await getEmail(email))
    }catch (e) {
      console.error("Erro ao acessar o banco:", e);
    }
  }

  async function handleCpfChange(cpf){
    const cleanCPF = removeSpecialCharacters(cpf)
      try{
        setCpfExiste(await getPerfilPF(cleanCPF))
      }catch(e){
        console.error("Erro ao acessar o banco:", e);
      }
  }
  const cpf = watch("cpf")
  const [cpfExiste, setCpfExiste] = useState(false)

  React.useEffect(() => {
    if (cpf && cpf.length === 14) {
      handleCpfChange(cpf)
    }
  }, [cpf]);

  const onSubmit = (data) => {
    const cleanedData = {
      ...data,
      cpf: removeSpecialCharacters(data.cpf),
      rg: removeSpecialCharacters(data.rg),
      cep: removeSpecialCharacters(data.cep),
      celular: removeSpecialCharacters(data.celular),
      telefone: removeSpecialCharacters(data.telefone),
      numero: data.numero.toString(),
    };

    setSubmittedData(cleanedData);
    onDataSubmit(cleanedData);
  };

  return (
    <div className="container mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold mb-4">Pessoa Física</h2>
        <p className="mb-2 text-gray-600">
          Campos marcados com * são obrigatórios
        </p>
        <div className="flex flex-col divide-y divide-solid">
          <div>
            <h3 className="text-xl mb-4">Dados Cadastrais</h3>
            <div className="flex flex-col justify-around w-full md:flex-row">
              {/* PRIMEIRA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <label htmlFor="nome" className="block mb-1">
                    Nome Completo*
                  </label>
                  <input
                    type="text"
                    {...register("nome")}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.nome && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.nome.message}
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
                  <label htmlFor="repetir_email" className="block mb-1">
                    Repetir E-mail*
                  </label>
                  <input
                    type="email"
                    id="repetir_email"
                    name="repetir_email"
                    {...register("repetir_email")}
                    disabled={emailExiste}
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
              </div>
              {/* SEGUNDA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4 flex gap-2">
                  <div className="w-2/5">
                    <label
                      htmlFor="data_nascimento"
                      className="block mb-1 hover truncate overflow-hidden"
                    >
                      Data de Nascimeto*
                    </label>
                    <input
                      type="date"
                      id="data_nascimento"
                      name="data_nascimento"
                      {...register("data_nascimento")}
                      disabled={emailExiste}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.data_nascimento && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.data_nascimento.message}
                      </p>
                    )}
                  </div>
                  <div className="w-3/5">
                    <label htmlFor="rg" className="block mb-1 hover">
                      RG*
                    </label>
                    <InputMask
                      type="text"
                      id="rg"
                      name="rg"
                      mask="__.___.___-_"
                      replacement={{ _: /\d/ }}
                      placeholder="__.___.___-__"
                      {...register("rg")}
                      disabled={emailExiste}
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
                    CPF*
                  </label>
                  <InputMask
                    type="text"
                    id="cpf"
                    name="cpf"
                    mask="___.___.___-__"
                    replacement={{ _: /\d/ }}
                    disabled={emailExiste}
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
                <div className="mb-4">
                  <label htmlFor="celular" className="block mb-1 hover">
                    Celular*
                  </label>
                  <InputMask
                    type="text"
                    id="celular"
                    name="celular"
                    mask="(__) _____-____"
                    replacement={{ _: /\d/ }}
                    placeholder="(00) 00000-0000"
                    {...register("celular")}
                    disabled={emailExiste}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.celular && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.celular.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="telefone" className="block mb-1 hover">
                    Telefone:
                  </label>
                  <InputMask
                    type="text"
                    id="telefone"
                    name="telefone"
                    mask="(__) ____-____"
                    replacement={{ _: /\d/ }}
                    placeholder="(00) 0000-0000"
                    {...register("telefone")}
                    disabled={emailExiste}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
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
                    disabled={emailExiste}
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
                    disabled={emailExiste}
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
                      disabled={emailExiste}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.numero && (
                      <p className="text-red-500 mt-1 text-xs">
                        {errors.numero.message}
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
                      disabled={emailExiste}
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
                    disabled={emailExiste}
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
                    disabled={emailExiste}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.estado && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.estado.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="complemento" className="block mb-1">
                    Complemento:
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    {...register("complemento")}
                    disabled={emailExiste}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
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
                  disabled={emailExiste}
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
                    disabled={emailExiste}
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
