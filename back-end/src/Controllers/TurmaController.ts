import { MediaNotasPorDisciplinaDTOSchema } from "../models/dto/MediaNotasPorDisciplinaDTO";
import { FastifyTypedInstance } from "../models/types/FastifyTypedInstace";
import { TurmaService } from "../Services/TurmaService";

export default function TurmaController(app: FastifyTypedInstance) {
  app.get("/media-notas-materia", {
    schema: {
      response: {
        200: MediaNotasPorDisciplinaDTOSchema.array().describe("Lista de médias de notas por disciplina")
      }
    }
  }, async (req, reply) => {
    const medias = await TurmaService.getMediaNotasPorMateria();

    return reply.send(medias);
  });
}