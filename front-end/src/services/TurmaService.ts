import { api } from "@/lib/api";
import { MediaNotasPorDisciplinaDTOSchema } from "@/models/dto/MediaNotasPorDisciplinaDTO";

export class TurmaService {
  public static async getMediaNotasPorDisciplina() {
    const res = await api.get("/turma/media-notas-materia");

    const data = MediaNotasPorDisciplinaDTOSchema.array().parse(res.data);

    return data;
  }
}