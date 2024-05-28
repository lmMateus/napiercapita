"use server";
import { db } from '@/lib/db';

export const getValorTotalTitulosAntecipadosCredor = async (codPerfil) => {
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
