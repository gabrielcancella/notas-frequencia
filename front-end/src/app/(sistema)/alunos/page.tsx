"use client";

import * as React from "react";
import { AlunoCompletoDTO } from "@/models/dto/AlunoCompletoDTO";
import { AdicionarAlunoButton } from "@/components/AdicionarAluno";
import { AlunoService } from "@/services/AlunoService";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { DisciplinaService } from "@/services/DisciplinaService";
import { AlterarAlunoButton } from "@/components/AlterarAluno";
import { FiltrosAluno } from "@/models/FiltrosAluno";
import { SelectFiltroAluno } from "@/components/SelectFiltroAluno";

export default function AlunosPage() {
  const [ columns, setColumns ] = React.useState<ColumnDef<AlunoCompletoDTO>[]>();
  const [ filtro, setFiltro ] = React.useState<FiltrosAluno>(FiltrosAluno.Nenhum);

  const { data } = useQuery({
    queryKey: ["alunos", filtro],
    queryFn: async () => {
      let funcBuscarAlunos: () => Promise<AlunoCompletoDTO[]>;

      switch (filtro) {
        case FiltrosAluno.AcimaDaMedia:
          funcBuscarAlunos = AlunoService.getAcimaDaMediaCompleto;
          break;
        case FiltrosAluno.AbaixoDaMedia:
          funcBuscarAlunos = AlunoService.getAbaixoDaMediaCompleto;
          break;
        case FiltrosAluno.AbaixoDe75Frequencia:
          funcBuscarAlunos = AlunoService.getAbaixoDe75FrequenciaCompleto;
          break;
        default:
          funcBuscarAlunos = AlunoService.getAllCompleto;
          break;
      }

      const [ alunos, disciplinas ] = await Promise.all([
        funcBuscarAlunos(),
        DisciplinaService.getAll()
      ]);

      return { alunos, disciplinas };
    }
  });

  React.useEffect(() => {
    if (!data) return;

    const temp: ColumnDef<AlunoCompletoDTO>[] = [
      {
        accessorKey: "nome",
        header: "Nome",
      },
      ...(data.disciplinas ?? []).map((disciplina): ColumnDef<AlunoCompletoDTO> => ({
        id: `nota-${disciplina.id}`,
        accessorFn: (row) => {
          const nota = row.notas.find(n => n.disciplina.id === disciplina.id);
          return nota ? nota.nota : null;
        },
        header: () => (
          <div className="flex flex-1 justify-center">
            Nota em {disciplina.nome}
          </div>
        ),
        cell: ({ getValue }) => {
          const value = getValue();
          return <div className="flex flex-1 justify-center">
            {value !== null && value !== undefined ? `${value}` : "N/A"}
          </div>;
        },
      })),
      {
        id: "media-notas",
        header: () => {
          return (
            <div className="flex flex-1 justify-center">
              Média das Notas
            </div>
          );
        },
        accessorFn: (row) => {
          const somaNotas = row.notas.reduce((valorAtual, nota) => valorAtual + nota.nota, 0);
          return (somaNotas / row.notas.length).toFixed(1) || 0;
        },
        cell: ({ row }) => {
          const media: number = row.getValue("media-notas");
          return (
            <div className="flex flex-1 justify-center">
              {media}
            </div>
          );
        }
      },
      {
        accessorKey: "frequencia",
        header: () => (
          <div className="flex flex-1 justify-center">
            Frequência
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-1 justify-center">
            {row.getValue("frequencia")}%
          </div>
        ),
      },
      {
        accessorKey: "id",
        header: () => (
          <div className="flex flex-1 justify-center">
            Ações
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="flex flex-1 justify-center">
              <AlterarAlunoButton aluno={row.original} />
            </div>
          )
        }
      }
    ];

    setColumns(temp);
  }, [ data ]);

  return (
    <div>
      <section className="flex justify-between items-center py-2">
        <div>
          <span className="text-sm text-muted-foreground">Filtro:</span>
          <SelectFiltroAluno selected={filtro} onChange={setFiltro} />
        </div>
        <h1 className="font-bold text-2xl">Alunos</h1>
        <AdicionarAlunoButton className="mt-auto" />
      </section>
      <section className="flex flex-1 justify-center">
        <DataTable columns={columns ?? []} data={data?.alunos ?? []} />
      </section>
    </div>
  )
}