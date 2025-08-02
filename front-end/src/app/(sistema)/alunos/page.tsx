"use client";

import * as React from "react";
import { AlunoCompletoDTO } from "@/models/dto/AlunoCompletoDTO";
import { AdicionarAlunoButton } from "@/components/AdicionarAluno";
import { AlunoService } from "@/services/AlunoService";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DisciplinaService } from "@/services/DisciplinaService";
import { AlterarAlunoButton } from "@/components/AlterarAluno";

export default function AlunosPage() {
  const [ columns, setColumns ] = React.useState<ColumnDef<AlunoCompletoDTO>[]>();

  const { data } = useQuery({
    queryKey: ["alunos"],
    queryFn: async () => {
      const [ alunos, disciplinas ] = await Promise.all([
        AlunoService.getAllCompleto(),
        DisciplinaService.getAll()
      ]);

      return { alunos, disciplinas };
    }
  });

  React.useEffect(() => {
    if (!data) return;

    const temp: ColumnDef<AlunoCompletoDTO>[] = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => row.getValue("id"),
      },
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
      <section className="relative flex justify-between items-center py-4">
        <Button variant={"outline"}>Adicionar Aluno</Button>
        <h1 className="font-bold text-2xl">Alunos</h1>
        <AdicionarAlunoButton />
      </section>
      <section className="flex flex-1 justify-center">
        <DataTable columns={columns ?? []} data={data?.alunos ?? []} />
      </section>
    </div>
  )
}