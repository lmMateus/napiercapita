"use server";
import { db } from '@/lib/db';

export const getValorTotalTitulosAntecipadosCredor = async (codPerfil, dataSelected) => {
  try {
    const titulos = await db.titulo.findMany({
      where: {
        cod_perfil: codPerfil,
        titulo_antecipado: {
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
      },
      include: {
        titulo_antecipado: true
      }
    });

    let valorTotal = 0;
    for (const titulo of titulos) {
      if (titulo.titulo_antecipado) 
        valorTotal += titulo.titulo_antecipado.valor_pago.toNumber()
    }

    await db.$disconnect();
    return valorTotal;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
