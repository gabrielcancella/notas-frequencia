import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlunoCompletoDTO } from "@/models/dto/AlunoCompletoDTO";
import { AlunoService } from "@/services/AlunoService";
import { queryClient } from "@/components/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { AlunoForm } from "@/components/AlunoForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AlterarAlunoButton({ aluno }: { aluno: AlunoCompletoDTO } ) {
  const [ open, setOpen ] = React.useState(false);
  const [ _aluno, setAluno ] = React.useState<AlunoCompletoDTO>(aluno);

  const { mutate } = useMutation({
    mutationFn: AlunoService.update,
    onSuccess: () => {
      setOpen(false);
      toast.success("Aluno atualizado com sucesso!", {
        description: `Os dados do aluno ${aluno.nome} foram alterados.`,
      });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar aluno", {
        description: error instanceof Error ? error.message : "Ocorreu um erro ao atualizar o aluno.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Alterar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterando aluno.</DialogTitle>
          <DialogDescription>
            Altere os dados do aluno conforme necessário e clique em confirmar.
          </DialogDescription>
        </DialogHeader>
        <AlunoForm aluno={_aluno} onUpdate={setAluno} onConfirm={mutate} />
      </DialogContent>
    </Dialog>
  )
}