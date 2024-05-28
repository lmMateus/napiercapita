"use server";
import { db } from "@/lib/db";
import { error } from "console";

const getEmail = async (email) => {
  try {
    const perfil = await db.perfil.findUnique({
      where: {
        email: email,
      },
    });
    if (perfil == null) {
      return error;
    }
    return perfil;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
};

export const checkEmail = async (email) => {
  try {
    const perfil = await db.perfil.findUnique({
      where: {
        email: email,
      },
    });
    if (perfil == null) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
};

export const getPerfilPF = async (cod) => {
  try {
    const perfil = await db.pessoa_fisica.findUnique({
      where: {
        cod_perfil: cod,
      },
    });
    return perfil;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
};

export const getPerfilPJ = async (cod) => {
  try {
    const perfil = await db.pessoa_juridica.findUnique({
      where: {
        cod_perfil: cod,
      },
    });
    return perfil;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return { error: "Erro ao buscar dados da API" };
  } finally {
    await db.$disconnect();
  }
};

export const getPerfil= async (email) =>{  
  let perfil;
  try{
    perfil = await getEmail(email)
  } catch(error) {
    console.error("Erro ao buscar dados da API:", error);
  } finally {
    await db.$disconnect();
  }
  if(perfil.tipo_persona == 'pessoa_fisica'){
    try{
      perfil = {...perfil, ...await getPerfilPF(perfil.cod_perfil)}
      return perfil;
    } catch(error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      await db.$disconnect();
    }
  }else{
    try{
      perfil = {...perfil, ...await getPerfilPJ(perfil.cod_perfil)}
      perfil.capital_social = perfil.capital_social.toNumber() 
      return perfil;
    } catch(error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      await db.$disconnect();
    }
  }
};


