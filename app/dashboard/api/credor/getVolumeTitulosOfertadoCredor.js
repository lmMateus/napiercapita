"use server";
import { db } from '@/lib/db';

export const getVolumeTitulosOfertadoCredor = async (codPerfil) => {
  try {
    // Recupere o volume de títulos antecipados da tabela titulo_antecipado usando o cod_perfil fornecido
    const volumeTitulosOfertado = await db.titulo.count({
      where: {
        cod_perfil: codPerfil
      }
    });

    await db.$disconnect();
    return volumeTitulosOfertado;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
