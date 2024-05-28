const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};
global.prismaGlobal = undefined;
const prisma = global.prismaGlobal || prismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}
export const db = prisma
