"use server";
import { db } from '@/lib/db'

export const getTitles = async (limit) => {
  let titlesWithProfileAndType;
  try {
    const titles = await db.titulo.findMany({
      take: limit,
      include: {
        perfil: {
          include: {
            pessoa_fisica: true, // Inclui os dados de pessoa física associados ao perfil
            pessoa_juridica: true, // Inclui os dados de pessoa jurídica associados ao perfil
          }
        },
        garantia: true
      },
    });
    titlesWithProfileAndType = titles.map(title => {
      const { tipo_persona, pessoa_fisica, pessoa_juridica, ...rest } = title.perfil;
      let profileData = tipo_persona === 'pessoa_fisica' ? pessoa_fisica : pessoa_juridica;    
      if(tipo_persona == 'pessoa_juridica'){
        profileData.capital_social = profileData.capital_social.toNumber()
      }
      return {
        ...rest,
        perfil: {
          tipo_persona,
          ...profileData,
        },
        ...title,
        valor_ofertado: title.valor_ofertado.toNumber(),
        valor_titulo: title.valor_titulo.toNumber(),
        desagio: title.desagio.toNumber(),
      };
    });
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw new Error('Erro ao buscar dados da API');
  } finally {
    await db.$disconnect();
  }
  return titlesWithProfileAndType;
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
    return titleFormatted
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  } finally{
    await db.$disconnect();
  }
}