"use server";
import { db } from '@/lib/db';

// Função para obter o volume de títulos antecipados pelo cod_perfil especificado
export const getVolumeTitulosAntecipadosInvestidor = async (codPerfil) => {
  try {
    // Recupere o volume de títulos antecipados da tabela titulo_antecipado usando o cod_perfil fornecido
    const volumeTitulosAntecipados = await db.titulo_antecipado.count({
      where: {
        cod_perfil: codPerfil
      }
    });

    await db.$disconnect();
    return volumeTitulosAntecipados;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
