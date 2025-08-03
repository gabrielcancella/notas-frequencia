import { AlunoCompletoDTO } from "../models/dto/AlunoCompletoDTO";
import { prisma } from "../server";
import { TurmaService } from "./TurmaService";


export class AlunoService {
  public static async getAll() {
    const alunos = await prisma.alunos.findMany();
    
    return alunos;
  }

  public static async getAllCompleto() {
    const alunos = await prisma.alunos.findMany({
      include: {
        notas: {
          include: {
            disciplinas: true
          }
        }
      }
    });

    return alunos.map(this.reestruturaAlunoCompleto);
  }

  public static async getAcimaDaMediaCompleto() {
    const media = await TurmaService.getMediaDeNotas();

    const todosAlunos = await AlunoService.getAllCompleto();

    return todosAlunos.filter(aluno => {
      return (aluno.notas.reduce((valorAtual, nota) => ( valorAtual + nota.nota ), 0) / aluno.notas.length) > media;
    });
  }

  public static async getAbaixoDaMediaCompleto() {
    const media = await TurmaService.getMediaDeNotas();

    const todosAlunos = await AlunoService.getAllCompleto();

    return todosAlunos.filter(aluno => {
      return (aluno.notas.reduce((valorAtual, nota) => ( valorAtual + nota.nota ), 0) / aluno.notas.length) < media;
    });
  }

  public static async getAbaixoDe75FreqCompleto() {
    const alunos = await prisma.alunos.findMany({
      include: {
        notas: {
          include: {
            disciplinas: true
          }
        }
      },
      where: {
        frequencia: {
          lt: 75
        }
      }
    })

    return alunos.map(this.reestruturaAlunoCompleto);
  }

  public static async create(aluno: AlunoCompletoDTO) {
    const novoAluno = await prisma.alunos.create({
      data: {
        ...aluno,
        notas: {
          createMany: {
            data: aluno.notas.map(nota => ({
              disciplina: nota.disciplina.id,
              nota: nota.nota
            }))
          }
        }
      },
    });

    return novoAluno;
  }

  public static async update(aluno: AlunoCompletoDTO) {
    const updatedAluno = await prisma.alunos.update({
      where: { id: aluno.id },
      data: {
        ...aluno,
        notas: {
          upsert: aluno.notas.map(nota => ({
            where: { id: nota.id },
            update: {
              nota: nota.nota
            },
            create: {
              disciplina: nota.disciplina.id,
              nota: nota.nota
            }
          }))
        }
      }
    });

    return updatedAluno;
  }

  private static reestruturaAlunoCompleto(aluno: any): AlunoCompletoDTO {
    return {
      ...aluno,
      notas: aluno.notas.map((nota: any) => ({
        id: nota.id,
        disciplina: nota.disciplinas,
        nota: nota.nota
      }))
    }
  }
}