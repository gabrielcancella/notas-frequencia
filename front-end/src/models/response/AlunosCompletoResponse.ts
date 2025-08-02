import { z } from "zod";

const AlunosCompletoResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  frequencia: z.number().default(100),
  notas: z.array(z.object({
    id: z.number(),
    nota: z.number(),
    disciplina: z.object({
      id: z.number(),
      nome: z.string(),
    })
  }))
});

type AlunosCompletoResponse = z.infer<typeof AlunosCompletoResponseSchema>;

export { AlunosCompletoResponseSchema };
export type { AlunosCompletoResponse };