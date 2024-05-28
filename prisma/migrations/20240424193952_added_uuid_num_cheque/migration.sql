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
  - The primary key for the `titulo_antecipado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `cod_garantia` on the `automoveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_garantia` on the `bancaria` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `num_cheque` to the `cheque` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cod_titulo` on the `cheque` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_titulo` on the `credito_tributario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_titulo` on the `debenture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_titulo` on the `factoring` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_garantia` on the `garantia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_titulo` on the `garantia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_garantia` on the `imobiliaria` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_titulo` on the `nota_promissoria` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_garantia` on the `outros` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_perfil` on the `perfil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_perfil` on the `pessoa_fisica` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_perfil` on the `pessoa_juridica` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `risco` to the `titulo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cod_titulo` on the `titulo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_perfil` on the `titulo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_antecipado` on the `titulo_antecipado` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_titulo` on the `titulo_antecipado` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cod_perfil` on the `titulo_antecipado` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
DROP COLUMN "cod_garantia",
ADD COLUMN     "cod_garantia" UUID NOT NULL,
ADD CONSTRAINT "automoveis_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "bancaria" DROP CONSTRAINT "bancaria_pkey",
DROP COLUMN "cod_garantia",
ADD COLUMN     "cod_garantia" UUID NOT NULL,
ADD CONSTRAINT "bancaria_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "cheque" DROP CONSTRAINT "cheque_pkey",
ADD COLUMN     "num_cheque" TEXT NOT NULL,
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
ADD CONSTRAINT "cheque_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "credito_tributario" DROP CONSTRAINT "credito_tributario_pkey",
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
ADD CONSTRAINT "credito_tributario_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "debenture" DROP CONSTRAINT "debenture_pkey",
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
ADD CONSTRAINT "debenture_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "factoring" DROP CONSTRAINT "factoring_pkey",
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
ADD CONSTRAINT "factoring_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "garantia" DROP CONSTRAINT "garantia_pkey",
DROP COLUMN "cod_garantia",
ADD COLUMN     "cod_garantia" UUID NOT NULL,
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
ADD CONSTRAINT "garantia_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "imobiliaria" DROP CONSTRAINT "imobiliaria_pkey",
DROP COLUMN "cod_garantia",
ADD COLUMN     "cod_garantia" UUID NOT NULL,
ADD CONSTRAINT "imobiliaria_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "nota_promissoria" DROP CONSTRAINT "nota_promissoria_pkey",
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
ADD CONSTRAINT "nota_promissoria_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "outros" DROP CONSTRAINT "outros_pkey",
DROP COLUMN "cod_garantia",
ADD COLUMN     "cod_garantia" UUID NOT NULL,
ADD CONSTRAINT "outros_pkey" PRIMARY KEY ("cod_garantia");

-- AlterTable
ALTER TABLE "perfil" DROP CONSTRAINT "perfil_pkey",
DROP COLUMN "cod_perfil",
ADD COLUMN     "cod_perfil" UUID NOT NULL,
ADD CONSTRAINT "perfil_pkey" PRIMARY KEY ("cod_perfil");

-- AlterTable
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_pkey",
DROP COLUMN "cod_perfil",
ADD COLUMN     "cod_perfil" UUID NOT NULL,
ADD CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("cod_perfil");

-- AlterTable
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_pkey",
DROP COLUMN "cod_perfil",
ADD COLUMN     "cod_perfil" UUID NOT NULL,
ADD CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("cod_perfil");

-- AlterTable
ALTER TABLE "titulo" DROP CONSTRAINT "titulo_pkey",
ADD COLUMN     "risco" TEXT NOT NULL,
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
DROP COLUMN "cod_perfil",
ADD COLUMN     "cod_perfil" UUID NOT NULL,
ADD CONSTRAINT "titulo_pkey" PRIMARY KEY ("cod_titulo");

-- AlterTable
ALTER TABLE "titulo_antecipado" DROP CONSTRAINT "titulo_antecipado_pkey",
DROP COLUMN "cod_antecipado",
ADD COLUMN     "cod_antecipado" UUID NOT NULL,
DROP COLUMN "cod_titulo",
ADD COLUMN     "cod_titulo" UUID NOT NULL,
DROP COLUMN "cod_perfil",
ADD COLUMN     "cod_perfil" UUID NOT NULL,
ADD CONSTRAINT "titulo_antecipado_pkey" PRIMARY KEY ("cod_antecipado");

-- CreateIndex
CREATE UNIQUE INDEX "automoveis_cod_garantia_key" ON "automoveis"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "bancaria_cod_garantia_key" ON "bancaria"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "cheque_cod_titulo_key" ON "cheque"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "credito_tributario_cod_titulo_key" ON "credito_tributario"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "debenture_cod_titulo_key" ON "debenture"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "factoring_cod_titulo_key" ON "factoring"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "garantia_cod_titulo_key" ON "garantia"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "imobiliaria_cod_garantia_key" ON "imobiliaria"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "nota_promissoria_cod_titulo_key" ON "nota_promissoria"("cod_titulo");

-- CreateIndex
CREATE UNIQUE INDEX "outros_cod_garantia_key" ON "outros"("cod_garantia");

-- CreateIndex
CREATE UNIQUE INDEX "titulo_antecipado_cod_titulo_key" ON "titulo_antecipado"("cod_titulo");

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
