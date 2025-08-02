import { z } from "zod";

const DisciplinaSchema = z.object({
  id: z.number(),
  nome: z.string().min(1, "O nome da disciplina é obrigatório"),
});

type Disciplina = z.infer<typeof DisciplinaSchema>;

export { DisciplinaSchema };
export type { Disciplina };