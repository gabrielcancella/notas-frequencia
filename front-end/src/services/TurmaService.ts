import { api } from "@/lib/api";
import { MediaNotasPorDisciplinaSchema } from "@/models/dto/MediaNotasPorDisciplina";

export class TurmaService {
  public static async getMediaNotasPorDisciplina() {
    const res = await api.get("/turma/media-notas-materia");

    const data = MediaNotasPorDisciplinaSchema.array().parse(res.data);

    return data;
  }
}