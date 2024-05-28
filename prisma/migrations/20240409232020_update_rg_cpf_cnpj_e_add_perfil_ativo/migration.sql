/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `pessoa_fisica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `pessoa_fisica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `pessoa_juridica` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `perfil_ativo` to the `perfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "perfil" ADD COLUMN     "perfil_ativo" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_cpf_key" ON "pessoa_fisica"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_rg_key" ON "pessoa_fisica"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_cnpj_key" ON "pessoa_juridica"("cnpj");
