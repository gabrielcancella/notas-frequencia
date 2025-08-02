import { api } from "@/lib/api";
import { AlunoSchema } from "@/models/entity/AlunoEntity";
import { AlunosCompletoResponseSchema } from "@/models/response/AlunosCompletoResponse";

export class AlunoService {
  public static async getAll() {
    const res = await api.get("/alunos");

    const data = AlunoSchema.array().parse(res.data);

    return data;
  }

  public static async getAllCompleto() {
    const res = await api.get("/alunos/completo");

    const data = AlunosCompletoResponseSchema.array().parse(res.data);

    return data;
  }
}