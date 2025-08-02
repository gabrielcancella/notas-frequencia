import { api } from "@/lib/api";

export class AlunoService {
  public static async getAll() {
    const res = await api.get("/alunos");

    return res.data;
  }
}