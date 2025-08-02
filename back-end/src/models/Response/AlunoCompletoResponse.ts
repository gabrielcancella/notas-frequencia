import { z } from "zod";
import { DisciplinaSchema } from "../entity/DisciplinaEntity";

export const AlunoCompletoResponseSchema = z.object({
  id: z.number().describe("ID do aluno"),
  nome: z.string().describe("Nome do aluno"),
  frequencia: z.number().describe("Frequência do aluno"),
  notas: z.array(z.object({
    id: z.number().describe("ID da nota"),
    disciplina: DisciplinaSchema,
    nota: z.number().describe("Nota do aluno na disciplina"),
  }))
});