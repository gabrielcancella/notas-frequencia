import { AlunoCompletoDTO } from "../models/dto/AlunoCompletoDTO";
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
}