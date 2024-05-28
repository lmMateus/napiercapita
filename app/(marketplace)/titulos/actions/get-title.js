"use server";
import { db } from '@/lib/db'

export const getTitles = async (limit) => {
  var titlesFormatted
  try {
    const titles = await db.titulo.findMany({
      take: limit,
    })
    titlesFormatted = titles.map(title => ({
      ...title,
      valor_ofertado: title.valor_ofertado.toNumber(),
      valor_titulo: title.valor_titulo.toNumber(),
      desagio: title.desagio.toNumber(),
    }));
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
  await db.$disconnect();
  return titlesFormatted
}

export const getTitle = async (cod, tipo) => { 
  var titleFormatted
  try {
    const title = await db[tipo].findFirst({
      where:{
        cod_titulo: cod
      }
    })
    titleFormatted = title
    if(tipo == 'debenture'){
      titleFormatted.valor_nominal = title.valor_nominal.toNumber();
      titleFormatted.taxa_juros = title.taxa_juros.toNumber();
      titleFormatted.resgate_antecipado = title.resgate_antecipado.toNumber();
    }
    if(tipo == 'factoring'){
      titleFormatted.valor_adiantamento= title.valor_adiantamento.toNumber();
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
  await db.$disconnect();
  return titleFormatted
}