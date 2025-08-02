import { z } from "zod";

const AlunoCompletoDTOSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  frequencia: z.number(),
  notas: z.array(z.object({
    id: z.number().optional(),
    nota: z.number(),
    disciplina: z.object({
      id: z.number(),
      nome: z.string(),
    })
  }))
});

type AlunoCompletoDTO = z.infer<typeof AlunoCompletoDTOSchema>;

export { AlunoCompletoDTOSchema };
export type { AlunoCompletoDTO };