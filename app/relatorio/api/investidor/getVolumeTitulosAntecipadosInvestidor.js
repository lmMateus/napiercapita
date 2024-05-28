"use server";
import { db } from '@/lib/db';

// Função para obter o volume de títulos antecipados pelo cod_perfil especificado
export const getVolumeTitulosAntecipadosInvestidor = async (codPerfil, dataSelected) => {
  try {
    // Recupere o volume de títulos antecipados da tabela titulo_antecipado usando o cod_perfil fornecido
    const volumeTitulosAntecipados = await db.titulo_antecipado.count({
      where: {
        cod_perfil: codPerfil,
        AND: [
          {
            data_antecipacao: {
              gte: dataSelected.from // "from" deve ser maior ou igual a data antecipada
            }
          },
          {
            data_antecipacao: {
              lte: dataSelected.to // "to" deve ser menor ou igual a data antecipada
            }
          }
        ]
      }
    });

    await db.$disconnect();
    return volumeTitulosAntecipados;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
