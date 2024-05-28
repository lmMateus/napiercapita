"use server";
import { db } from '@/lib/db';

// Função para obter o valor total dos títulos antecipados pelo cod_perfil especificado
export const getValorTotalTitulosAntecipadosInvestidor = async (codPerfil) => {
  try {
    // Recupere os títulos antecipados da tabela titulo_antecipado usando o cod_perfil fornecido
    const titulosAntecipados = await db.titulo_antecipado.findMany({
      where: {
        cod_perfil: codPerfil
      }
    });

    // Calcular o valor total dos títulos antecipados
    let valorTotal = 0;
    for (const titulo of titulosAntecipados) {
      valorTotal += titulo.valor_pago.toNumber(); // Somando o valor pago de cada título
    }

    await db.$disconnect();
    return valorTotal;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
