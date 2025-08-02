import { Aluno } from "../models/entity/AlunoEntity";
import { prisma } from "../server";


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

    return alunos.map((aluno) => ({
      ...aluno,
      notas: aluno.notas.map((nota) => ({
        id: nota.id,
        disciplina: nota.disciplinas,
        nota: nota.nota
      }))
    }));
  }

  public static async create(aluno: Aluno) {
    const novoAluno = await prisma.alunos.create({
      data: aluno
    });

    return novoAluno;
  }
}