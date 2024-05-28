/*
  Warnings:

  - The primary key for the `automoveis` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `bancaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cheque` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `credito_tributario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `debenture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `factoring` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `garantia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `imobiliaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `nota_promissoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `outros` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `perfil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pessoa_fisica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pessoa_juridica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `titulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `perfil` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "automoveis" DROP CONSTRAINT "automoveis_cod_garantia_fkey";

-- DropForeignKey
ALTER TABLE "bancaria" DROP CONSTRAINT "bancaria_cod_garantia_fkey";

-- DropForeignKey
ALTER TABLE "cheque" DROP CONSTRAINT "cheque_cod_titulo_fkey";

-- DropForeignKey
ALTER TABLE "credito_tributario" DROP CONSTRAINT "credito_tributario_cod_titulo_fkey";

-- DropForeignKey
ALTER TABLE "debenture" DROP CONSTRAINT "debenture_cod_titulo_fkey";

-- DropForeignKey
ALTER TABLE "factoring" DROP CONSTRAINT "factoring_cod_titulo_fkey";

-- DropForeignKey
ALTER TABLE "garantia" DROP CONSTRAINT "garantia_cod_titulo_fkey";

-- DropForeignKey
ALTER TABLE "imobiliaria" DROP CONSTRAINT "imobiliaria_cod_garantia_fkey";

-- DropForeignKey
ALTER TABLE "nota_promissoria" DROP CONSTRAINT "nota_promissoria_cod_titulo_fkey";

-- DropForeignKey
ALTER TABLE "outros" DROP CONSTRAINT "outros_cod_garantia_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_cod_perfil_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_cod_perfil_fkey";

-- DropForeignKey
ALTER TABLE "titulo" DROP CONSTRAINT "titulo_cod_perfil_fkey";

-- DropForeignKey
ALTER TABLE "titulo_antecipado" DROP CONSTRAINT "titulo_antecipado_cod_perfil_fkey";

-- DropForeignKey
ALTER TABLE "titulo_antecipado" DROP CONSTRAINT "titulo_antecipado_cod_titulo_fkey";

-- AlterTable
ALTER TABLE "automoveis" DROP CONSTRAINT "automoveis_pkey",
ALTER COLUMN "cod_garantia" SET DATA TYPE TEXT,
ADD CONSTRAINT "automoveis_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "bancaria" DROP CONSTRAINT "bancaria_pkey",
ALTER COLUMN "cod_garantia" SET DATA TYPE TEXT,
ADD CONSTRAINT "bancaria_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "cheque" DROP CONSTRAINT "cheque_pkey",
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ADD CONSTRAINT "cheque_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "credito_tributario" DROP CONSTRAINT "credito_tributario_pkey",
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ADD CONSTRAINT "credito_tributario_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "debenture" DROP CONSTRAINT "debenture_pkey",
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ADD CONSTRAINT "debenture_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "factoring" DROP CONSTRAINT "factoring_pkey",
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ADD CONSTRAINT "factoring_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "garantia" DROP CONSTRAINT "garantia_pkey",
ALTER COLUMN "cod_garantia" DROP DEFAULT,
ALTER COLUMN "cod_garantia" SET DATA TYPE TEXT,
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ADD CONSTRAINT "garantia_pkey" PRIMARY KEY ("cod_garantia");
DROP SEQUENCE "garantia_cod_garantia_seq";

-- AlterTable
ALTER TABLE "imobiliaria" DROP CONSTRAINT "imobiliaria_pkey",
ALTER COLUMN "cod_garantia" SET DATA TYPE TEXT,
ADD CONSTRAINT "imobiliaria_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "nota_promissoria" DROP CONSTRAINT "nota_promissoria_pkey",
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ADD CONSTRAINT "nota_promissoria_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "outros" DROP CONSTRAINT "outros_pkey",
ALTER COLUMN "cod_garantia" SET DATA TYPE TEXT,
ADD CONSTRAINT "outros_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "perfil" DROP CONSTRAINT "perfil_pkey",
ALTER COLUMN "cod_perfil" DROP DEFAULT,
ALTER COLUMN "cod_perfil" SET DATA TYPE TEXT,
ADD CONSTRAINT "perfil_pkey" PRIMARY KEY ("cod_perfil");
DROP SEQUENCE "perfil_cod_perfil_seq";

-- AlterTable
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_pkey",
ALTER COLUMN "cod_perfil" SET DATA TYPE TEXT,
ADD CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("cod_perfil");

-- AlterTable
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_pkey",
ALTER COLUMN "cod_perfil" SET DATA TYPE TEXT,
ADD CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("cod_perfil");

-- AlterTable
ALTER TABLE "titulo" DROP CONSTRAINT "titulo_pkey",
ALTER COLUMN "cod_titulo" DROP DEFAULT,
ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ALTER COLUMN "cod_perfil" SET DATA TYPE TEXT,
ADD CONSTRAINT "titulo_pkey" PRIMARY KEY ("cod_titulo");
DROP SEQUENCE "titulo_cod_titulo_seq";

-- AlterTable
ALTER TABLE "titulo_antecipado" ALTER COLUMN "cod_titulo" SET DATA TYPE TEXT,
ALTER COLUMN "cod_perfil" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "perfil_email_key" ON "perfil"("email");

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulo" ADD CONSTRAINT "titulo_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulo_antecipado" ADD CONSTRAINT "titulo_antecipado_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulo_antecipado" ADD CONSTRAINT "titulo_antecipado_cod_titulo_fkey" FOREIGN KEY ("cod_titulo") REFERENCES "titulo"("cod_titulo") ON DELETE RESTRICT ON UPDATE CASCADE;

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
