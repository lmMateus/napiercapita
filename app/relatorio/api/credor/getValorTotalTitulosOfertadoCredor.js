"use server";
import { db } from '@/lib/db';

export const getValorTotalTitulosOfertadoCredor = async (codPerfil, dataSelected) => {
  try {
    const titulosOfertado = await db.titulo.findMany({
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

    let valorTotal = 0;
    for (const titulo of titulosOfertado) {
      valorTotal += titulo.valor_ofertado.toNumber();
    }
    await db.$disconnect();
    return valorTotal;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
