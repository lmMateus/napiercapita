"use server";
import { db } from '@/lib/db';

// Função para obter a data de vencimento do título
export const getTituloVencimentoProximo = async (codPerfil) => {
  let titulosAntecipadosFormatado;
  try {
    // Recupere o cod_titulo da tabela titulo_antecipado usando o cod_perfil fornecido
    const tituloAntecipados = await db.titulo_antecipado.findMany({
      where: {
        cod_perfil: codPerfil
      },
      include: {
        titulo: true // Include the related `titulo` model
      },
      orderBy: {
        titulo: {
          'data_vencimento': 'asc' // Order the results by `data_vencimento` of the related `titulo`
        }
      },
      take: 3
    });
    if (!tituloAntecipados || tituloAntecipados.length === 0) {
      throw new Error('Nenhum título antecipado encontrado para o perfil de investidor fornecido');
    }

    titulosAntecipadosFormatado = tituloAntecipados.map(titulo => ({
      ...titulo,
      valor_pago: titulo.valor_pago.toNumber()
    }))

    for (let titulo of titulosAntecipadosFormatado) {
      titulo["titulo"]["valor_titulo"] = titulo["titulo"]["valor_titulo"].toNumber()
      titulo["titulo"]["valor_ofertado"] = titulo["titulo"]["valor_ofertado"].toNumber()
      titulo["titulo"]["desagio"] = titulo["titulo"]["desagio"].toNumber()
    }

    await db.$disconnect();
    return titulosAntecipadosFormatado;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

