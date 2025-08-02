import { z } from "zod";
import { DisciplinaSchema } from "../entity/DisciplinaEntity";

export const AlunoCompletoDTOSchema = z.object({
  id: z.number().optional().describe("ID do aluno"),
  nome: z.string().describe("Nome do aluno"),
  frequencia: z.number().describe("Frequência do aluno"),
  notas: z.array(z.object({
    id: z.number().optional().describe("ID da nota"),
    disciplina: DisciplinaSchema,
    nota: z.number().describe("Nota do aluno na disciplina"),
  }))
});

export type AlunoCompletoDTO = z.infer<typeof AlunoCompletoDTOSchema>;