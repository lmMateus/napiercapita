"use server";
import { db } from '@/lib/db';

export const getTitulosCredor = async (codPerfil, dataSelected) => {
  try {
    const titulos = await db.titulo.findMany({
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
      },
      include: {
        titulo_antecipado: true,
        garantia: true,
        factoring: true,
        cheque: true,
        credito_tributario: true,
        nota_promissoria: true,
        debenture: true
      }
    });

    titulos.forEach((titulo) => {
      titulo.valor_ofertado = titulo.valor_ofertado.toNumber();
      titulo.valor_titulo = titulo.valor_titulo.toNumber();
      titulo.desagio = titulo.desagio.toNumber();
      if (titulo.titulo_antecipado) 
        titulo.titulo_antecipado.valor_pago = titulo.titulo_antecipado.valor_pago.toNumber()

      if(titulo.tipo == 'debenture'){
        titulo.debenture.valor_nominal = titulo.debenture.valor_nominal.toNumber();
        titulo.debenture.taxa_juros = titulo.debenture.taxa_juros.toNumber();
        titulo.debenture.resgate_antecipado = titulo.debenture.resgate_antecipado.toNumber();
      }

      if(titulo.tipo == 'factoring'){
        titulo.factoring.valor_adiantamento =  titulo.factoring.valor_adiantamento.toNumber();
      }
    })


    return titulos;

  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

