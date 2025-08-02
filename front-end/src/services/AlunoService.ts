import { api } from "@/lib/api";
import { AlunoSchema } from "@/models/entity/AlunoEntity";
import { AlunoCompletoDTO, AlunoCompletoDTOSchema } from "@/models/dto/AlunoCompletoDTO";

export class AlunoService {
  public static async getAll() {
    const res = await api.get("/alunos");

    const data = AlunoSchema.array().parse(res.data);

    return data;
  }

  public static async getAllCompleto() {
    const res = await api.get("/alunos/completo");

    const data = AlunoCompletoDTOSchema.array().parse(res.data);

    return data;
  }

  public static async create(aluno: AlunoCompletoDTO) {
    const res = await api.post("/alunos", aluno);

    return res;
  }
}