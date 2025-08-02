import { api } from "@/lib/api";
import { DisciplinaSchema } from "@/models/entity/DisciplinaEntity";

export class DisciplinaService {
  public static async getAll() {
    const res = await api.get("/disciplinas");

    const data = DisciplinaSchema.array().parse(res.data);
    
    return data;
  }
}