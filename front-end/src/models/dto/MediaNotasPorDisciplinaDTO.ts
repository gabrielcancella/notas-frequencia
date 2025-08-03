import { z } from "zod";

const MediaNotasPorDisciplinaDTOSchema = z.object({
  media: z.number(),
  disciplina: z.string()
});

type MediaNotasPorDisciplinaDTO = z.infer<typeof MediaNotasPorDisciplinaDTOSchema>;

export { MediaNotasPorDisciplinaDTOSchema };
export type { MediaNotasPorDisciplinaDTO };