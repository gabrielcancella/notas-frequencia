export enum FiltrosAluno {
  Nenhum = 0,
  AcimaDaMedia = 1,
  AbaixoDaMedia = 2,
  AbaixoDe75Frequencia = 3
}

export const FiltrosAlunoLabels: Record<FiltrosAluno, string> = {
  [FiltrosAluno.Nenhum]: "Nenhum",
  [FiltrosAluno.AcimaDaMedia]: "Acima da Média",
  [FiltrosAluno.AbaixoDaMedia]: "Abaixo da Média",
  [FiltrosAluno.AbaixoDe75Frequencia]: "Abaixo de 75% de Frequência"
};