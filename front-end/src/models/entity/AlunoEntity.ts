import { z } from "zod";

const AlunoSchema = z.object({
  id: z.number().optional(), // O ID é opcional pois pode não ser fornecido ao criar um novo aluno
  nome: z.string().min(1, "O nome é obrigatório"),
  frequencia: z.number().min(0, "A frequência deve ser um número positivo").max(100, "A frequência não pode ser maior que 100%").default(100),
});

type Aluno = z.infer<typeof AlunoSchema>;

export { AlunoSchema };
export type { Aluno };