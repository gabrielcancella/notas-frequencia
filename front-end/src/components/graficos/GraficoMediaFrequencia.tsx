"use client";

import { TurmaService } from "@/services/TurmaService";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";



export function GraficoMediaFrequencia() {
  const { data, isLoading } = useQuery({
    queryKey: ["media-frequencia"],
    queryFn: async () => {
      const media = await TurmaService.getMediaFrequencia();

      return media.media;
    }
  });

  if (isLoading) {
    return (
      <Skeleton className="w-full aspect-square" />
    )
  }

  return (
    <div className="flex flex-1 h-full items-center justify-center">
      <span className="text-9xl font-medium">{data.toFixed(1).replace(".", ",")}%</span>
    </div>
  );
}