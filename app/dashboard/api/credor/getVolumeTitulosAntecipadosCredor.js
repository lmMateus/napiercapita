"use server";
import { db } from '@/lib/db';

export const getVolumeTitulosAntecipadosCredor = async (codPerfil) => {
  try {
    const titulos = await db.titulo.findMany({
      where: {
        cod_perfil: codPerfil
      },
      include: {
        titulo_antecipado: true
      }
    });

    let volume = 0;
    for (const titulo of titulos) {
      if (titulo.titulo_antecipado) volume++;
    }

    await db.$disconnect();
    return volume;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
