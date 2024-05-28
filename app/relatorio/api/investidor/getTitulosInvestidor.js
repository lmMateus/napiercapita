"use server";
import { db } from '@/lib/db';

export const getTitulosInvestidor = async (codPerfil, dataSelected) => {
    try {
        const titulosAntecipados = await db.titulo_antecipado.findMany({
            where: {
                cod_perfil: codPerfil,
                AND: [
                    {
                        data_antecipacao: {
                            gte: dataSelected.from // "from" deve ser maior ou igual a data antecipada
                        }
                    },
                    {
                        data_antecipacao: {
                            lte: dataSelected.to // "to" deve ser menor ou igual a data antecipada
                        }
                    }
                ]
            },
            include: {
                titulo: true,
                titulo: {
                    include: {
                        factoring: true,
                        cheque: true,
                        credito_tributario: true,
                        nota_promissoria: true,
                        debenture: true
                    }
                }

            }
        });

        let titulosAntecipadosFormatado = titulosAntecipados.map(titulo => ({
            ...titulo,
            valor_pago: titulo.valor_pago.toNumber(),
            titulo: {
                ...titulo.titulo,
                valor_titulo: titulo.titulo.valor_titulo.toNumber(),
                valor_ofertado: titulo.titulo.valor_ofertado.toNumber(),
                desagio: titulo.titulo.desagio.toNumber()
            },
            debenture: {
                ...titulo.debenture,
                valor_nominal: titulo.debenture.valor_nominal.toNumber(),
                taxa_juros: titulo.debenture.taxa_juros.toNumber(),
                resgate_antecipado: titulo.debenture.resgate_antecipado.toNumber()
            },
            factoring: {
                ...titulo.factoring,
                valor_adiantamento: titulo.factoring.valor_adiantamento.toNumber()
            }
        }));

        return titulosAntecipadosFormatado;

    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await db.$disconnect();

    }
}
