import { api } from "@/lib/api";
import { AlunoSchema } from "@/models/entity/AlunoEntity";
import { AlunoCompletoDTO, AlunoCompletoDTOSchema } from "@/models/dto/AlunoCompletoDTO";

export class AlunoService {
  public static async getAllCompleto() {
    const res = await api.get("/alunos/completo");

    const data = AlunoCompletoDTOSchema.array().parse(res.data);

    return data;
  }

  public static async getAcimaDaMediaCompleto() {
    const res = await api.get("/alunos/completo/acima-da-media");

    const data = AlunoCompletoDTOSchema.array().parse(res.data);

    return data;
  }

  public static async getAbaixoDaMediaCompleto() {
    const res = await api.get("/alunos/completo/abaixo-da-media");

    const data = AlunoCompletoDTOSchema.array().parse(res.data);

    return data;
  }

  public static async getAbaixoDe75FrequenciaCompleto() {
    const res = await api.get("/alunos/completo/abaixo-de-75-frequencia");
    
    const data = AlunoCompletoDTOSchema.array().parse(res.data);
    
    return data;
  }

  public static async create(aluno: AlunoCompletoDTO) {
    const res = await api.post("/alunos", aluno);

    return res;
  }

  public static async update(aluno: AlunoCompletoDTO) {
    const res = await api.put(`/alunos/${aluno.id}`, aluno);

    return res;
  }
}