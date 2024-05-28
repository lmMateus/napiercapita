"use server";
import { db } from "@/lib/db";
import getCurrentUser from "../../../lib/currentUser";
import { getPerfil } from "./get-perfil";

export const postTitulo = async (data) => {
  const { dadosGarantia, ...rest } = data;
  //const user = getCurrentUser;
  const { cod_perfil, error } = await getPerfil("dgojsrscxiqxdoenkx@cazlq.com");
  try {
    const newTitulo = await db.titulo.create({
      data: {
        tipo_titulo: rest.tipo_titulo,
        status_titulo: "ofertado",
        descricao: rest.descricao,
        emissor: rest.emissor,
        doc_emissor: rest.doc_emissor,
        valor_ofertado: rest.valor_ofertado,
        data_vencimento: rest.data_vencimento,
        valor_titulo: rest.valor_titulo,
        desagio: 0,
        risco: rest.risco,
        cod_perfil: "9f36a94d-e79f-455c-a5a3-e05a03c194e4",
      },
    });
    switch (rest.tipo_titulo) {
      case "Cheque":
        const newCheque = await db.cheque.create({
          data: {
            nome_banco: rest.nome_banco,
            num_banco: rest.num_banco,
            data_emissao: rest.data_emissao,
            nome_beneficiario: rest.nome_beneficiario,
            doc_beneficiario: rest.doc_beneficiario,
            assinatura_emitente: rest.assinatura_emitente,
            num_cheque: rest.num_cheque,
            cod_titulo: newTitulo.cod_titulo,
          },
        });
        break;

      case "Crédito Tributario":
        const newCreditoTributario = await db.credito_tributario.create({
          data: {
            assinatura_partes: rest.assinatura_partes,
            natureza_credito: rest.natureza_credito,
            data_apuracao_inicio: rest.data_apuracao_inicio,
            data_apuracao_fim: rest.data_apuracao_fim,
            movito_credito: rest.motivo_credito,
            documentacao_suporte: rest.documentacao_suporte,
            data_requerimento_formal: rest.data_requerimento_formal,
            data_solicitacao: rest.data_solicitacao,
            cod_titulo: newTitulo.cod_titulo,
          },
        });
        break;
      case "Debenture":
        const newDebenture = await db.debenture.create({
          data: {
            numero: rest.numero,
            assinatura_emitente: rest.assinatura_emitente,
            valor_nominal: rest.valor_nominal,
            data_emissao: rest.data_emissao,
            prazo_vencimento: rest.prazo_vencimento,
            taxa_juros: rest.taxa_juros,
            clausulas: rest.clausulas,
            inf_emissao: rest.inf_emissao,
            local_pagamento: rest.local_pagamento,
            resgate_antecipado: rest.resgate_antecipado,
            cod_titulo: newTitulo.cod_titulo,
          },
        });
        break;
      case "Factoring":
        const newFactoring = await db.factoring.create({
          data: {
            contrato: rest.contrato,
            contratante: rest.contratante,
            valor_adiantamento: rest.valor_adiantamento,
            data_transacao: rest.data_transacao,
            cod_titulo: newTitulo.cod_titulo,
          },
        });
        break;
      case "Nota Promissória":
        const newNotaPromissoria = await db.nota_promissoria.create({
          data: {
            data_emissao: rest.data_emissao,
            local_emissao: rest.local_emissao,
            nome_beneficiario: rest.nome_beneficiario,
            doc_beneficiario: rest.doc_beneficiario,
            local_pagamento: rest.local_pagamento,
            clausula_a_ordem: rest.clausula_a_ordem,
            numero_promissoria: rest.numero_promissoria,
            cod_titulo: newTitulo.cod_titulo,
          },
        });
        break;
      default:
        throw error;
    }
    const newGarantia = await db.garantia.create({
      data: {
        tipo_garantia: dadosGarantia.tipo_garantia,
        valor_garantia: dadosGarantia.valor_garantia,
        cod_titulo: newTitulo.cod_titulo,
      },
    });
    switch (dadosGarantia.tipo_garantia) {
      case "automovel":
        const newAutomovel = await db.automoveis.create({
          data: {
            renavan: dadosGarantia.garantia_renavan,
            placa: dadosGarantia.garantia_placa,
            tipo: dadosGarantia.garantia_tipo_veiculo,
            cod_garantia: newGarantia.cod_garantia,
          },
        });
        break;
      case "bancaria":
        const newBancaria = await db.bancaria.create({
          data: {
            banco: dadosGarantia.garantia_num_banco,
            numero: dadosGarantia.garantia_num_conta,
            tipo: dadosGarantia.garantia_tipo_conta,
            cod_garantia: newGarantia.cod_garantia,
          },
        });
        break;
      case "imobiliaria":
        const newImobiliaria = await db.imobiliaria.create({
          data: {
            matricula: dadosGarantia.garantia_matricula,
            cartorio: dadosGarantia.garantia_cartorio,
            comarca: dadosGarantia.garantia_comarca,
            cod_garantia: newGarantia.cod_garantia,
          },
        });
        break;
      case "outro":
        const newOutro = await db.outro.create({
          data: {
            descricao: dadosGarantia.garantia_descricao,
            tipo: dadosGarantia.garantia_tipo_outro,
            cod_garantia: newGarantia.cod_garantia,
          },
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Erro ao criar titulo:", error);
    throw error; // Lança o erro para ser tratado no código que chama essa função
  } finally {
    await db.$disconnect();
  }
};
