"use server";
import { db } from "@/lib/db";

export const getPerfil = async (email) => {
  try {
    const perfil = await db.perfil.findUnique({
      where: {
        email: email,
      },
    });

    if (perfil === null) {
      throw new Error('Perfil não encontrado');
    }

    // Retorna apenas o cod_perfil
    return { cod_perfil: perfil.cod_perfil };
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
}
