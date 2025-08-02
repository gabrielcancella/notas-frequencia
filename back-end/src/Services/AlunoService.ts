import { Aluno } from "../models/entity/AlunoEntity";
import { prisma } from "../server";
import { DisciplinaService } from "./DisciplinaService";


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
    const disciplinas = await DisciplinaService.getAll();

    const novoAluno = await prisma.alunos.create({
      data: {
        ...aluno,
        notas: {
          createMany: {
            data: disciplinas.map((disciplina) => ({
              disciplina: disciplina.id,
              nota: 0
            }))
          }
        }
      },
    });

    return novoAluno;
  }
}