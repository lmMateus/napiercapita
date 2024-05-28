"use server";
import { db } from "@/lib/db";

export const getPerfil = async (cod_perfil) => {
    try {
        const perfil = await db.perfil.findUnique({
            where: {
                cod_perfil: cod_perfil,
            }
        });

        if (!perfil) {
            return { error: "Perfil não encontrado" };
        }
        if (perfil.tipo_persona === "pessoa_fisica") {
            return await getPerfilPF(cod_perfil);
        } else if (perfil.tipo_persona === "pessoa_juridica") {
            return await getPerfilPJ(cod_perfil);
        } else {
            return { error: "Tipo de Pessoa Desconhecido" };
        }

    } catch (error) {
        return { error: "Erro ao buscar dados do Perfil" };
    } finally {
        await db.$disconnect();
    }
};


// Função para obter perfil de Pessoa Física
const getPerfilPF = async (cod_perfil) => {
    try {
        const perfil = await db.perfil.findUnique({
            where: {
                cod_perfil: cod_perfil,
            },
            include: {
                pessoa_fisica: true
            }
        });

        return perfil;

    } catch (error) {
        return { error: "Erro ao buscar dados do Perfil de Pessoa Física" };
    } finally {
        await db.$disconnect();
    }
};

// Função para obter perfil de Pessoa Jurídica
const getPerfilPJ = async (cod_perfil) => {
    try {
        const perfil = await db.perfil.findUnique({
            where: {
                cod_perfil: cod_perfil,
            },
            include: {
                pessoa_juridica: true
            }
        });


        return perfil;

    } catch (error) {
        return { error: "Erro ao buscar dados do Perfil de Pessoa Jurídica" };
    } finally {
        await db.$disconnect();
    }
};
