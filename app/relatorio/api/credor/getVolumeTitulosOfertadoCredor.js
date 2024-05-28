"use server";
import { db } from '@/lib/db';

export const getVolumeTitulosOfertadoCredor = async (codPerfil, dataSelected) => {
  try {
    // Recupere o volume de títulos antecipados da tabela titulo_antecipado usando o cod_perfil fornecido
    const volumeTitulosOfertado = await db.titulo.count({
      where: {
        cod_perfil: codPerfil,
        AND: [
          {
            data_cadastro: {
              gte: dataSelected.from // "from" deve ser maior ou igual a data antecipada
            }
          },
          {
            data_cadastro: {
              lte: dataSelected.to // "to" deve ser menor ou igual a data antecipada
            }
          }
        ]
      }
    });

    await db.$disconnect();
    return volumeTitulosOfertado;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
