"use server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { error } from "console";
import { randomInt } from "crypto";
import { supabase} from "@/utils/supabase/client";

export const postPerfil = async (
  email_perfil,
  senha,
  tipo_perfil,
  tipo_persona,
  { rest }
) => {
  try {
    const randomSalt = randomInt(10, 16);
    const hashedPassword = await hash(senha, randomSalt);

    const newPerfil = await db.perfil.create({
      data: {
        email: email_perfil,
        senha: hashedPassword,
        tipo_perfil: tipo_perfil,
        tipo_persona: tipo_persona,
        perfil_ativo: true
      },
    });
    if (tipo_persona === "pessoa_fisica") {
      await db.pessoa_fisica.create({
        data: {
          cod_perfil: newPerfil.cod_perfil,
          cpf: rest.cpf,
          rg: rest.rg,
          nome: rest.nome,
          data_nascimento: rest.data_nascimento,
          telefone: rest.telefone,
          celular: rest.celular,
          cep: rest.cep,
          rua: rest.rua,
          numero: rest.numero,
          bairro: rest.bairro,
          cidade: rest.cidade,
          uf: rest.uf,
          complemento: rest.complemento,
        },
      });
    } else if (tipo_persona === "pessoa_juridica") {
      await db.pessoa_juridica.create({
        data: {
          cod_perfil: newPerfil.cod_perfil,
          cnpj: rest.cnpj,
          razao_social: rest.razao_social,
          nome_fantasia: rest.nome_fantasia,
          capital_social: rest.capital_social,
          telefone: rest.telefone,
          cep: rest.cep,
          rua: rest.rua,
          numero: rest.numero,
          bairro: rest.bairro,
          cidade: rest.cidade,
          uf: rest.uf,
          complemento: rest.complemento,
        },
      });
    } else {
        throw error
    }
    const { error } = await supabase.auth.signUp({
      email: email_perfil,
      password: senha,
    })
    return newPerfil;
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    throw error; // Lança o erro para ser tratado no código que chama essa função
  } finally{
    await db.$disconnect();
  }
};
