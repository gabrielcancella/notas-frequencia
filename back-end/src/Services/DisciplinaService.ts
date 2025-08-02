import { prisma } from "../server";

export class DisciplinaService {
  public static async getAll() {
    const disciplinas = await prisma.disciplinas.findMany();
    
    return disciplinas;
  }
}