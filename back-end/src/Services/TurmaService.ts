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

  public static async getMediaNotasPorMateria() {
    const notas = await prisma.disciplinas.findMany({
      include: {
        notas: true
      }
    });

    return notas.map((d) => {
      const media = d.notas.reduce((valorAtual, nota) => ( valorAtual + nota.nota ), 0) / d.notas.length;
      return {
        media: Number(media.toFixed(1)),
        disciplina: d.nome,
      }
    });
  }
}