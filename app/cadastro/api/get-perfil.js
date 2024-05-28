"use server";
import { db } from "@/lib/db";

export const getPerfilPF = async (cpf) => {
  try {
    const perfil = await db.pessoa_fisica.findUnique({
      where: {
        cpf: cpf,
      },
    });

    if (perfil == null) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
};

export const getPerfilPJ = async (cnpj) => {
  try {
    const perfil = await db.pessoa_juridica.findUnique({
      where: {
        cnpj: cnpj,
      },
    });
    if (perfil == null) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
};

export const getEmail = async (email) => {
  try {
    const perfil = await db.perfil.findUnique({
      where: {
        email: email,
      },
    });
    if (perfil == null) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
}