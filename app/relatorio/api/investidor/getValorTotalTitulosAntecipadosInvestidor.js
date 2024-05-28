"use server";
import { db } from '@/lib/db';
// Função para obter o valor total dos títulos antecipados pelo cod_perfil especificado
export const getValorTotalTitulosAntecipadosInvestidor = async (codPerfil, dataSelected) => {
  try {

    const titulosAntecipados = await db.titulo_antecipado.findMany({
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

    // Calcular o valor total dos títulos antecipados
    let valorTotal = 0;
    for (const titulo of titulosAntecipados) {
      console.log(titulo)
      valorTotal += titulo.valor_pago.toNumber(); // Somando o valor pago de cada título
    }

    await db.$disconnect();
    return valorTotal;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
