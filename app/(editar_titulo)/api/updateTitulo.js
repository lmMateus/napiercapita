import { db } from '@/lib/db';

export const updateTitulo = async (cod_titulo, updatedData) => {
  try {
    // Verificar se o título está registrado como antecipado
    const isAntecipado = await db.titulo_antecipado.findUnique({
      where: { cod_titulo },
    });

    if (isAntecipado) {
      throw new Error('Não é possível atualizar um título antecipado.');
    }

    const { titulo_antecipado, factoring, cheque, credito_tributario, debenture, nota_promissoria, garantia, ...tituloData } = updatedData;

    // Atualizar o título principal
    const updatedTitulo = await db.titulo.update({
      where: { cod_titulo },
      data: tituloData,
    });

    // Atualizar ou criar registros relacionados nas outras tabelas, se existirem
    if (factoring) {
      await db.factoring.update({
        where: { cod_titulo },
        data: factoring,
      });
    }

    if (cheque) {
      await db.cheque.update({
        where: { cod_titulo },
        data: cheque,
      });
    }

    if (credito_tributario) {
      await db.credito_tributario.update({
        where: { cod_titulo },
        data: credito_tributario,
      });
    }

    if (debenture) {
      await db.debenture.update({
        where: { cod_titulo },
        data: debenture,
      });
    }

    if (nota_promissoria) {
      await db.nota_promissoria.update({
        where: { cod_titulo },
        data: nota_promissoria,
      });
    }

    if (garantia) {
      const { automoveis, bancaria, imobiliaria, outros, ...garantiaData } = garantia;

      await db.garantia.update({
        where: { cod_titulo },
        data: garantiaData,
      });

      if (automoveis) {
        await db.automoveis.update({
          where: { cod_garantia: garantia.cod_garantia },
          data: automoveis,
        });
      }

      if (bancaria) {
        await db.bancaria.update({
          where: { cod_garantia: garantia.cod_garantia },
          data: bancaria,
        });
      }

      if (imobiliaria) {
        await db.imobiliaria.update({
          where: { cod_garantia: garantia.cod_garantia },
          data: imobiliaria,
        });
      }

      if (outros) {
        await db.outros.update({
          where: { cod_garantia: garantia.cod_garantia },
          data: outros,
        });
      }
    }

    console.log('Título e registros relacionados atualizados com sucesso:', updatedTitulo);
    return updatedTitulo;
  } catch (error) {
    console.error('Erro ao atualizar título e registros relacionados:', error);
    throw error;
  } finally {
    await db.$disconnect();
  }
};

// // Exemplo de uso:
// const cod_titulo = 'código_do_título_a_ser_atualizado';
// const updatedData = {
//   tipo_titulo: 'Novo Tipo de Título',
//   status_titulo: 'Novo Status',
//   titulo_antecipado: {
//     data_antecipacao: new Date(),
//     valor_pago: 1000.00,
//   },
//   factoring: {
//     contrato: 'Novo Contrato',
//     contratante: 'Novo Contratante',
//     valor_adiantamento: 2000.00,
//     data_transacao: new Date(),
//   },
//   // outros campos e dados relacionados
// };

// updateTitulo(cod_titulo, updatedData)
//   .then(titulo => {
//     console.log('Função completada com sucesso:', titulo);
//   })
//   .catch(error => {
//     console.error('Erro na função:', error);
//   });
