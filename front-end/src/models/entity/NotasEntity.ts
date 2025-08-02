import { z } from "zod";
import { DisciplinaSchema } from "./DisciplinaEntity";
import { AlunoSchema } from "./AlunoEntity";

const NotaSchema = z.object({
  id: z.number(),
  disciplina: DisciplinaSchema,
  aluno: AlunoSchema,
  nota: z.number().min(0, "A nota deve ser maior ou igual a 0").max(10, "A nota deve ser menor ou igual a 10"),
});

type Nota = z.infer<typeof NotaSchema>;

export { NotaSchema };
export type { Nota };