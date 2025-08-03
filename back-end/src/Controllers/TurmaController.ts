import { MediaNotasPorDisciplinaDTOSchema } from "../models/dto/MediaNotasPorDisciplinaDTO";
import { FastifyTypedInstance } from "../models/types/FastifyTypedInstace";
import { TurmaService } from "../Services/TurmaService";
import { z } from "zod";

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

  app.get("/media-frequencia", {
    schema: {
      response: {
        200: z.object({
          media: z.number().describe("Média de frequência"),
        })
      }
    }
  }, async (req, reply) => {
    const media = await TurmaService.getMediaFrequencia();

    return reply.send(media);
  });
}