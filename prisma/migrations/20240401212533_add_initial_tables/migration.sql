-- CreateTable
CREATE TABLE "perfil" (
    "cod_perfil" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo_perfil" TEXT NOT NULL,
    "tipo_persona" TEXT NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("cod_perfil")
);

-- CreateTable
CREATE TABLE "pessoa_juridica" (
    "cod_perfil" INTEGER NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "razao_social" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "capital_social" DECIMAL(12,2) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,

    CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("cod_perfil")
);

-- CreateTable
CREATE TABLE "pessoa_fisica" (
    "cod_perfil" INTEGER NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "rg" VARCHAR(9) NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "telefone" VARCHAR(10) NOT NULL,
    "celular" VARCHAR(11) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,

    CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("cod_perfil")
);

-- CreateTable
CREATE TABLE "titulo" (
    "cod_titulo" SERIAL NOT NULL,
    "cod_perfil" INTEGER NOT NULL,
    "tipo_titulo" TEXT NOT NULL,
    "status_titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "emissor" TEXT NOT NULL,
    "doc_emissor" TEXT NOT NULL,
    "valor_ofertado" DECIMAL(12,2) NOT NULL,
    "valor_titulo" DECIMAL(12,2) NOT NULL,
    "data_cadastro" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_vencimento" DATE NOT NULL,
    "desagio" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "titulo_pkey" PRIMARY KEY ("cod_titulo")
);

-- CreateTable
CREATE TABLE "titulo_antecipado" (
    "cod_antecipado" SERIAL NOT NULL,
    "cod_titulo" INTEGER NOT NULL,
    "cod_perfil" INTEGER NOT NULL,
    "data_antecipacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_pago" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "titulo_antecipado_pkey" PRIMARY KEY ("cod_antecipado")
);

-- CreateTable
CREATE TABLE "factoring" (
    "cod_titulo" INTEGER NOT NULL,
    "contrato" TEXT NOT NULL,
    "contratante" TEXT NOT NULL,
    "valor_adiantamento" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "data_transacao" DATE NOT NULL,

    CONSTRAINT "factoring_pkey" PRIMARY KEY ("cod_titulo")
);

-- CreateTable
CREATE TABLE "cheque" (
    "cod_titulo" INTEGER NOT NULL,
    "nome_banco" TEXT NOT NULL,
    "num_banco" TEXT NOT NULL,
    "data_emissao" DATE NOT NULL,
    "nome_beneficiario" TEXT NOT NULL DEFAULT '',
    "doc_beneficiario" VARCHAR(14) NOT NULL DEFAULT '',
    "assinatura_emitente" BOOLEAN NOT NULL,

    CONSTRAINT "cheque_pkey" PRIMARY KEY ("cod_titulo")
);

-- CreateTable
CREATE TABLE "credito_tributario" (
    "cod_titulo" INTEGER NOT NULL,
    "assinatura_partes" BOOLEAN NOT NULL,
    "natureza_credito" TEXT NOT NULL,
    "data_apuracao_inicio" DATE NOT NULL,
    "data_apuracao_fim" DATE NOT NULL,
    "motivo_credito" TEXT NOT NULL,
    "documentacao_suporte" BOOLEAN NOT NULL,
    "data_requerimento_formal" DATE NOT NULL,
    "data_solicitacao" DATE NOT NULL,

    CONSTRAINT "credito_tributario_pkey" PRIMARY KEY ("cod_titulo")
);

-- CreateTable
CREATE TABLE "nota_promissoria" (
    "cod_titulo" INTEGER NOT NULL,
    "data_emissao" DATE NOT NULL,
    "local_emissao" TEXT NOT NULL,
    "nome_beneficiario" TEXT NOT NULL,
    "doc_beneficiario" VARCHAR(14) NOT NULL,
    "local_pagamento" TEXT NOT NULL,
    "clausula_a_ordem" TEXT NOT NULL,
    "numero_promissoria" INTEGER NOT NULL,

    CONSTRAINT "nota_promissoria_pkey" PRIMARY KEY ("cod_titulo")
);

-- CreateTable
CREATE TABLE "debenture" (
    "cod_titulo" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "assinatura_emitente" BOOLEAN NOT NULL,
    "valor_nominal" DECIMAL(12,2) NOT NULL,
    "data_emissao" DATE NOT NULL,
    "prazo_vencimento" DATE NOT NULL,
    "taxa_juros" DECIMAL(5,2) NOT NULL,
    "clausulas" TEXT NOT NULL,
    "resgate_antecipado" DECIMAL(12,2) NOT NULL,
    "inf_emissao" TEXT NOT NULL,
    "local_pagamento" TEXT NOT NULL,

    CONSTRAINT "debenture_pkey" PRIMARY KEY ("cod_titulo")
);

-- CreateTable
CREATE TABLE "garantia" (
    "cod_garantia" SERIAL NOT NULL,
    "cod_titulo" INTEGER NOT NULL,
    "tipo_garantia" TEXT NOT NULL,
    "valor_garantia" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "garantia_pkey" PRIMARY KEY ("cod_garantia")
);

-- CreateTable
CREATE TABLE "imobiliaria" (
    "cod_garantia" INTEGER NOT NULL,
    "matricula" TEXT NOT NULL,
    "cartorio" TEXT NOT NULL,
    "comarca" TEXT NOT NULL,

    CONSTRAINT "imobiliaria_pkey" PRIMARY KEY ("cod_garantia")
);

-- CreateTable
CREATE TABLE "automoveis" (
    "cod_garantia" INTEGER NOT NULL,
    "renavan" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "automoveis_pkey" PRIMARY KEY ("cod_garantia")
);

-- CreateTable
CREATE TABLE "bancaria" (
    "cod_garantia" INTEGER NOT NULL,
    "banco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "bancaria_pkey" PRIMARY KEY ("cod_garantia")
);

-- CreateTable
CREATE TABLE "outros" (
    "cod_garantia" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "outros_pkey" PRIMARY KEY ("cod_garantia")
);

-- CreateIndex
CREATE UNIQUE INDEX "titulo_antecipado_cod_titulo_key" ON "titulo_antecipado"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "factoring_cod_titulo_key" ON "factoring"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "cheque_cod_titulo_key" ON "cheque"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "credito_tributario_cod_titulo_key" ON "credito_tributario"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "nota_promissoria_cod_titulo_key" ON "nota_promissoria"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "debenture_cod_titulo_key" ON "debenture"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "garantia_cod_titulo_key" ON "garantia"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "imobiliaria_cod_garantia_key" ON "imobiliaria"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "automoveis_cod_garantia_key" ON "automoveis"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "bancaria_cod_garantia_key" ON "bancaria"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "outros_cod_garantia_key" ON "outros"("cod_garantia");

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulo" ADD CONSTRAINT "titulo_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulo_antecipado" ADD CONSTRAINT "titulo_antecipado_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulo_antecipado" ADD CONSTRAINT "titulo_antecipado_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factoring" ADD CONSTRAINT "factoring_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque" ADD CONSTRAINT "cheque_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credito_tributario" ADD CONSTRAINT "credito_tributario_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota_promissoria" ADD CONSTRAINT "nota_promissoria_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debenture" ADD CONSTRAINT "debenture_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garantia" ADD CONSTRAINT "garantia_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imobiliaria" ADD CONSTRAINT "imobiliaria_cod_garantia_fkey" FOREIGN KEY ("cod_garantia") REFERENCES "garantia"("cod_garantia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automoveis" ADD CONSTRAINT "automoveis_cod_garantia_fkey" FOREIGN KEY ("cod_garantia") REFERENCES "garantia"("cod_garantia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bancaria" ADD CONSTRAINT "bancaria_cod_garantia_fkey" FOREIGN KEY ("cod_garantia") REFERENCES "garantia"("cod_garantia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outros" ADD CONSTRAINT "outros_cod_garantia_fkey" FOREIGN KEY ("cod_garantia") REFERENCES "garantia"("cod_garantia") ON DELETE RESTRICT ON UPDATE CASCADE;
