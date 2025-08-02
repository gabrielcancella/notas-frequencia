import { DisciplinaSchema } from "../models/entity/DisciplinaEntity";
import { FastifyTypedInstance } from "../models/types/FastifyTypedInstace";
import { DisciplinaService } from "../Services/DisciplinaService";

export default function DisciplinaController(app: FastifyTypedInstance) {
  app.get("/", {
    schema: {
      response: {
        200: DisciplinaSchema.array().describe("Lista de disciplinas")
      }
    }
  }, async (req, reply) => {
    const disciplinas = await DisciplinaService.getAll();

    return reply.status(200).send(disciplinas);
  });
};