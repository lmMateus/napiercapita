"use server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { randomInt } from "crypto";

export const updateContatoPJ = async (cod, data) => {
  try {
    const updatedUser = await db.perfil.update({
      where: { cod_perfil: cod },
      data: {
        email: data.email,
      },
    })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
  } finally {
    await db.$disconnect()
  }
  try {
    const updatedUser = await db.pessoa_juridica.update({
      where: { cod_perfil: cod },
      data: {
        telefone: data.telefone,
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        complemento: data.complemento
      },
    })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
  } finally {
    await db.$disconnect()
  }
}

export const updateContatoPF = async (cod, data) => {
  try {
    const updatedUser = await db.perfil.update({
      where: { cod_perfil: cod },
      data: {
        email: data.email,
      },
    })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
  } finally {
    await db.$disconnect()
  }
  try {
    const updatedUser = await db.pessoa_fisica.update({
      where: { cod_perfil: cod },
      data: {
        celular: data.celular,
        telefone: data.telefone,
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        complemento: data.complemento
      },
    })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
  } finally {
    await db.$disconnect()
  }
}

export const updateSenha = async (cod, pass) =>{
  const randomSalt = randomInt(10, 16);
  const hashedPassword = await hash(pass, randomSalt);
  try {
    const updatedPassWord = await db.perfil.update({
      where: { cod_perfil: cod },
      data: {
        senha: hashedPassword
      },
    })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
  } finally {
    await db.$disconnect()
  }
}