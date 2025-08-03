"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { TurmaService } from "@/services/TurmaService";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  media: {
    label: "Média"
  }
};

export function GraficoMediaNotasPorDisciplina() {
  const { data, isLoading } = useQuery({
    queryKey: ["media-notas-por-disciplina"],
    queryFn: async () => {
      const medias = await TurmaService.getMediaNotasPorDisciplina();

      return medias.map((media, index) => ({
        ...media,
        fill: `var(--chart-${index + 1})`,
      }));
    }
  });
  
  return (
    <div className="flex flex-1 h-full">
      { isLoading ? (
        <Skeleton className="w-full h-full aspect-square" />
      ) : (
        <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground aspect-square mx-auto pb-0">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="media" label nameKey="disciplina" />
          </PieChart>
        </ChartContainer>
      ) }
    </div>
  );
}