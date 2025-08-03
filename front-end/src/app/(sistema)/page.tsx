import { GraficoMediaNotasPorDisciplina } from "@/components/graficos/MediaNotasPorDisciplina";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";

export default function Home() {
  return (
    <div className="pt-2">
      <section className="flex items-center justify-center">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </section>
      <section className="grid grid-cols-4">
        <Card className="aspect-square">
          <CardHeader>
            <CardTitle>Média de notas</CardTitle>
            <CardDescription>Média das notas da turma por disciplina</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <GraficoMediaNotasPorDisciplina  />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
