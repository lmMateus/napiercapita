"use server";
import { db } from "@/lib/db";

export const deletePerfil = async (cod) => {
  try {
    const deleteUser = await db.perfil.update({
      where: { cod_perfil: cod },
      data: {
        perfil_ativo: false,
      },
    })
  } catch (error) {
    console.error('Erro ao deletar perfil:', error)
  } finally {
    await db.$disconnect()
  }
}