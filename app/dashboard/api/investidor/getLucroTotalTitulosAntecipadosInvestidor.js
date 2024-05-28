"use server";
import { db } from '@/lib/db';

// Função para obter o Lucro Total dos títulos antecipados pelo cod_perfil especificado
export const getLucroTotalTitulosAntecipadosInvestidor = async (codPerfil) => {
  try {
    // Recupere os títulos antecipados da tabela titulo_antecipado usando o cod_perfil fornecido
    const titulosAntecipados = await db.titulo_antecipado.findMany({
      where: {
        cod_perfil: codPerfil
      },
      include: {
        titulo: true // Include the related `titulo` model
      }
    });

    // Calcular o Lucro Total dos títulos antecipados
    let lucroTotal = 0;
    for (const titulo of titulosAntecipados) {
      const valorTitulo = titulo.titulo.valor_titulo.toNumber();
      const valorPago = titulo.valor_pago.toNumber();
      const lucro = valorTitulo - valorPago;
      lucroTotal += lucro;
    }
    await db.$disconnect();
    return lucroTotal;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
