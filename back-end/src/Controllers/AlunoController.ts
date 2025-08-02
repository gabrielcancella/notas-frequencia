import { AlunoSchema } from "../models/entity/AlunoEntity";
import { FastifyTypedInstance } from "../models/types/FastifyTypedInstace";
import { z } from "zod";
import { AlunoCompletoDTOSchema } from "../models/dto/AlunoCompletoDTO";
import { AlunoService } from "../Services/AlunoService";

export default function AlunoController(app: FastifyTypedInstance) {
  app.get("/", {
    schema: {
      tags: ["Alunos"],
      description: "Lista todos os alunos",
      response: {
        200: z.array(AlunoSchema).describe("Lista de alunos"),
        204: z.object({ message: z.string() }).describe("Nenhum aluno encontrado")
      }
    }
  }, async (req, reply) => {
    const alunos = await AlunoService.getAll();

    return alunos.length >= 1 ? reply.send(alunos) : reply.status(204).send({ message: "Nenhum aluno encontrado" });
  });

  app.get("/completo", {
    schema: {
      tags: ["Alunos"],
      description: "Lista todos os alunos com notas e frequência",
      response: {
        200: z.array(AlunoCompletoDTOSchema).describe("Lista de alunos com notas e frequência"),
        204: z.object({ message: z.string() }).describe("Nenhum aluno encontrado")
      }
    }
  }, async (req, reply) => {
    const alunos = await AlunoService.getAllCompleto();

    return alunos.length >= 1 ? reply.send(alunos) : reply.status(204).send({ message: "Nenhum aluno encontrado" });
  });

  app.post("/", {
    schema: {
      tags: ["Alunos"],
      description: "Cria um novo aluno",
      body: AlunoCompletoDTOSchema,
      response: {
        201: AlunoSchema.describe("Aluno criado com sucesso"),
      }
    }
  }, async (req, reply) => {
    const aluno = await AlunoService.create(req.body);

    return reply.status(201).send(aluno);
  });

  app.put("/:id", {
    schema: {
      tags: ["Alunos"],
      description: "Atualiza um aluno existente",
      params: z.object({
        id: z.union([ z.string(), z.number() ]).describe("ID do aluno a ser atualizado")
      }),
      body: AlunoCompletoDTOSchema,
      response: {
        // 200: AlunoSchema.describe("Aluno atualizado com sucesso"),
        // 404: z.object({ message: z.string() }).describe("Aluno não encontrado")
      }
    }
  }, async (req, reply) => {
    const aluno = await AlunoService.update(req.body);

    return reply.status(200).send(aluno);
  });
}