"use client";

import { DataTable } from "@/components/ui/data-table";
import { AlunoService } from "@/services/AlunoService";
import { useQuery } from "@tanstack/react-query";

export default function AlunosPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["alunos"],
    queryFn: async () => {
      const alunos = await AlunoService.getAll();

      return alunos;
    }
  });

  return (
    <div>
      <section>
        <h1 className="text-center font-bold text-2xl">Alunos</h1>
      </section>
      <section className="flex justify-center">
        {/* <DataTable  /> */}
      </section>
    </div>
  )
}