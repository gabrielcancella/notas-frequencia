"use client";

import * as React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { AlunoCompletoDTO, AlunoCompletoDTOSchema } from "@/models/dto/AlunoCompletoDTO";
import { DisciplinaService } from "@/services/DisciplinaService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AlunoForm({ aluno, onUpdate, onConfirm }: { aluno: AlunoCompletoDTO, onUpdate: (aluno: AlunoCompletoDTO) => void, onConfirm: (aluno: AlunoCompletoDTO) => void }) {
  const form = useForm<AlunoCompletoDTO>({
    resolver: zodResolver(AlunoCompletoDTOSchema),
    defaultValues: {
      ...aluno,
      notas: aluno.notas || []
    }
  });

  const { data } = useQuery({
    queryKey: ["disciplinas"],
    queryFn: async () => {
      const disciplinas = await DisciplinaService.getAll();
      
      return disciplinas;
    },
    staleTime: 1000 * 60 * 5,
  });

  React.useEffect(() => {
    form.watch((value) => {
      if (value && JSON.stringify(value) !== JSON.stringify(aluno)) {
        onUpdate(value as AlunoCompletoDTO);
      }
    })
  }, [form, onUpdate, aluno]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onConfirm)} className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do aluno" {...field} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frequencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input
                      className="flex-1"
                      placeholder="Frequência"
                      type="number"
                      min={0}
                      max={100}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        let frequencia: string | number = e.target.value;
                        if (frequencia !== "") {
                          let numberFrequencia = Number(frequencia);
                          if (numberFrequencia < 0) {
                            numberFrequencia = 0;
                          } else if (numberFrequencia > 100) {
                            numberFrequencia = 100;
                          }
                          frequencia = numberFrequencia;
                        }
                        field.onChange(frequencia);
                      }}
                    />
                    <span className="font-semibold text-xl">%</span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          { (data && data.length > 0) && (
            <span className="col-span-full text-center font-semibold">Notas:</span>
          ) }
          { data?.map((disciplina) => (
            <FormField
              key={disciplina.id}
              control={form.control}
              name={"notas"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mx-auto">{disciplina.nome}</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder={`Nota`}
                        type="number"
                        value={field.value?.find(nota => nota.disciplina.id === disciplina.id)?.nota ?? 0}
                        onChange={(e) => {
                          let idNota = field.value?.find(nota => nota.disciplina.id === disciplina.id)?.id;
                          let nota: number | string = e.target.value.replace(/[^0-9.-]+/g, "");
                          if (nota !== "") {
                            let numberNota = Number(nota);
                            if (numberNota < 0) {
                              numberNota = 0;
                            } else if (numberNota > 10) {
                              numberNota = 10;
                            }
                            nota = numberNota;
                          }
                          field.onChange([...field.value?.filter(n => n.disciplina.id !== disciplina.id), { id: idNota, disciplina, nota }]);
                        }}
                        // onChange={(e) => {
                        //   let frequencia: string | number = e.target.value;
                        //   if (frequencia !== "") {
                        //     let numberFrequencia = Number(frequencia);
                        //     if (numberFrequencia < 0) {
                        //       numberFrequencia = 0;
                        //     } else if (numberFrequencia > 100) {
                        //       numberFrequencia = 100;
                        //     }
                        //     frequencia = numberFrequencia;
                        //   }
                        //   field.onChange(frequencia);
                        // }}
                        className="text-center"
                        min={0}
                        max={10}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )) }
        </div>

        <Button type="submit" className="w-full mt-4">Confirmar</Button>
      </form>
    </Form>
  );
}