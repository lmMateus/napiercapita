-- AlterTable
ALTER TABLE "debenture" ALTER COLUMN "valor_nominal" SET DATA TYPE DECIMAL(16,2),
ALTER COLUMN "taxa_juros" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "resgate_antecipado" SET DATA TYPE DECIMAL(16,2);

-- AlterTable
ALTER TABLE "factoring" ALTER COLUMN "valor_adiantamento" SET DATA TYPE DECIMAL(16,2);

-- AlterTable
ALTER TABLE "garantia" ALTER COLUMN "valor_garantia" SET DATA TYPE DECIMAL(16,2);

-- AlterTable
ALTER TABLE "pessoa_juridica" ALTER COLUMN "capital_social" SET DATA TYPE DECIMAL(16,2);

-- AlterTable
ALTER TABLE "titulo" ALTER COLUMN "valor_ofertado" SET DATA TYPE DECIMAL(16,2),
ALTER COLUMN "valor_titulo" SET DATA TYPE DECIMAL(16,2);

-- AlterTable
ALTER TABLE "titulo_antecipado" ALTER COLUMN "valor_pago" SET DATA TYPE DECIMAL(16,2);
