import { z } from "zod";

const MediaNotasPorDisciplinaSchema = z.object({
  media: z.number(),
  disciplina: z.string()
});

type MediaNotasPorDisciplina = z.infer<typeof MediaNotasPorDisciplinaSchema>;

export { MediaNotasPorDisciplinaSchema };
export type { MediaNotasPorDisciplina };