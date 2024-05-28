import React from "react";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { consultarCEP } from "../api/consultaCEP";
import { formatarCEP } from "../assets/scripts";
import { checkEmail } from "../api/get-perfil";
import { updateContatoPF, updateContatoPJ } from "../api/update-perfil"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

const Contato = ({ perfil }) => {
  const [showPassword, setShowPassword] = useState(false);

  const removeSpecialCharacters = (value) => {
    return value.replace(/[^0-9]/g, ""); // Remove todos os caracteres não numéricos
  };

  const cadastroPfSchema = z
    .object({
      email: z.string().email("Insira um endereço de e-mail válido"),
      repetir_email: z.string(),
      celular: z.string(),
      telefone: z.string().optional(),
      cep: z.string(),
      rua: z.string().min(1, "Preencha esse campo."),
      numero: z.coerce.number(),
      bairro: z.string().min(1, "Preencha esse campo."),
      cidade: z.string().min(1, "Preencha esse campo."),
      uf: z.string().min(1, "Preencha esse campo."),
      complemento: z.string().optional()
    })
    .refine((data) => data.email === data.repetir_email, {
      message: "Os endereços de e-mail não coincidem",
      path: ["repetir_email"],
    })
    .refine(
      (value) => {
        // if (!value.telefone) return true; // Se o valor for vazio, está tudo bem
        const cleanedValue = removeSpecialCharacters(value.telefone);
        return cleanedValue.length >= 10 && cleanedValue.length <= 11; // Telefone geralmente tem entre 10 e 11 dígitos
      },
      {
        message: "O telefone deve ter  10 dígitos numéricos",
        path: ["telefone"],
      }
    )
    .refine(
      (value) => {
        if (perfil.tipo_persona == 'pessoa_juridica') return true;
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
    });

  const [dataAPIs, setDataAPIs] = useState({});
  const [cepInvalido, setCepInvalido] = useState(false)
  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .replace(/^\w|\s\w/g, (letter) => letter.toUpperCase());
  };

  async function handleChangeCEP(cep) {
    const cepClean = removeSpecialCharacters(cep);
    try {
      const { data } = await consultarCEP(cepClean);
      if (data) {
        setCepInvalido(false);
        setDataAPIs({
          rua: data.logradouro ? capitalizeFirstLetter(data.logradouro) : "",
          bairro: data.bairro ? capitalizeFirstLetter(data.bairro) : "",
          cidade: data.localidade ? capitalizeFirstLetter(data.localidade) : "",
          uf: data.uf || "",
        });
      } else {
        setCepInvalido(true);
      }
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
    }
  }

  const formatPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };

  const formatCelPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };

  const formatCEP = (cep) => {
    if (!cep) return "";
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length === 8) {
      return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return cep;
  };
  if (perfil.tipo_persona == 'pessoa_juridica') perfil = { ...perfil, celular: '' }
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: perfil.email,
      repetir_email: perfil.email,
      telefone: formatPhone(perfil.telefone),
      celular: formatCelPhone(perfil.celular),
      cep: formatCEP(perfil.cep),
      numero: perfil.numero,
      complemento: perfil.complemento
    },
    resolver: zodResolver(cadastroPfSchema), // Resolver de Zod para react-hook-form
  });

  const [submittedData, setSubmittedData] = useState(null);

  const cep = watch("cep");

  useEffect(() => {
    if (cep && cep.length === 9) {
      handleChangeCEP(cep);
    }
  }, [cep]);

  useEffect(() => {
    if (dataAPIs.rua) {
      setValue("rua", dataAPIs.rua);
      setValue("bairro", dataAPIs.bairro);
      setValue("cidade", dataAPIs.cidade);
      setValue("uf", dataAPIs.uf);
    }
  }, [dataAPIs, setValue]);


  const [emailExiste, setEmailExiste] = useState(false)
  async function handleChangeEmail(email) {
    try {
      if (email == perfil.email) return setEmailExiste(false)
      setEmailExiste(await checkEmail(email))
    } catch (e) {
      console.error("Erro ao acessar o banco:", e);
    }
  }

  const { toast } = useToast()

  const onSubmit = async (data) => {
    const cleanedData = {
      ...data,
      cep: removeSpecialCharacters(data.cep),
      celular: removeSpecialCharacters(data.celular),
      telefone: removeSpecialCharacters(data.telefone),
      numero: data.numero.toString(),
    };
    setSubmittedData(cleanedData);
    if (perfil.tipo_persona == 'pessoa_fisica') {
      try {
        updateContatoPF(perfil.cod_perfil, cleanedData)
        setTimeout(() => {
          toast({
            title: 'Atualizado!',
            description: "Seus dados foram atualizados com sucesso!",
          })
        }, 400);
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
      }
    } else {
      try {
        updateContatoPJ(perfil.cod_perfil, cleanedData)
        setTimeout(() => {
          toast({
            title: 'Atualizado!',
            description: "Seus dados foram atualizados com sucesso!",
          })
        }, 400);
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col divide-y divide-solid">
          <div>
            <h6 className="text-lg mb-4">Contato</h6>
            <div className="flex flex-col justify-around w-full md:flex-row">
              {/* PRIMEIRA COLUNA FORM 1 */}
              <div className="w-full md:w-1/3">
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
                    required
                    disabled={emailExiste}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
                {perfil.tipo_persona == 'pessoa_fisica' ?
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
                  </div> : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <h6 className="text-lg mb-4">Endereço</h6>
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
        </div>
        <div className="flex flex-row justify-end w-full pt-4">
          <button
            type="submit"
            // onClick={()=> onSubmit(432)}
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

export default Contato;