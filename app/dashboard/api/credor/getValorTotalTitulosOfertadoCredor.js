"use server";
import { db } from '@/lib/db';

export const getValorTotalTitulosOfertadoCredor = async (codPerfil) => {
  try {
    const titulosOfertado = await db.titulo.findMany({
      where: {
        cod_perfil: codPerfil
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
