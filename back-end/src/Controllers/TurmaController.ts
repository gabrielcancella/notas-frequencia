import { FastifyTypedInstance } from "../models/types/FastifyTypedInstace";
import { TurmaService } from "../Services/TurmaService";

export default function TurmaController(app: FastifyTypedInstance) {
  app.get("/media-notas-materia", {
    schema: {

    }
  }, async (req, reply) => {
    const medias = await TurmaService.getMediaNotasPorMateria();

    return reply.send(medias);
  });
}