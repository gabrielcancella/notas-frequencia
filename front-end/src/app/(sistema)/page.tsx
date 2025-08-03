import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraficoMediaNotasPorDisciplina } from "@/components/graficos/MediaNotasPorDisciplina";
import { GraficoMediaFrequencia } from "@/components/graficos/GraficoMediaFrequencia";

export default function Home() {
  return (
    <div className="pt-2 space-y-2">
      <section className="flex items-center justify-center">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
        <Card className="aspect-square">
          <CardHeader>
            <CardTitle>Média de notas</CardTitle>
            <CardDescription>Média das notas da turma por disciplina</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <GraficoMediaNotasPorDisciplina  />
          </CardContent>
        </Card>

        <Card className="aspect-square">
          <CardHeader>
            <CardTitle>Média da frequência</CardTitle>
            <CardDescription>Média da frequência da turma</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <GraficoMediaFrequencia  />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
