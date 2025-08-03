import { prisma } from "../server";

export class TurmaService {
  public static async getMediaDeNotas() {
    const somas = await prisma.notas.aggregate({
      _sum: {
        nota: true,
      },
      _count: {
        _all: true,
      }
    });
    
    return ((somas._sum.nota ?? 0) / somas._count._all);
  }
}