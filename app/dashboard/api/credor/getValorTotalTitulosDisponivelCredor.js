"use server";
import { db } from '@/lib/db';

export const getValorTotalTitulosDisponivelCredor = async (codPerfil) => {
  try {
    const titulos = await db.titulo.findMany({
      where: {
        cod_perfil: codPerfil
      },
      include: {
        titulo_antecipado: true
      }
    });

    let valorTotal = 0;
    for (const titulo of titulos) {
      if (!titulo.titulo_antecipado) 
        valorTotal += titulo.valor_titulo.toNumber()
    }

    await db.$disconnect();
    return valorTotal;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
