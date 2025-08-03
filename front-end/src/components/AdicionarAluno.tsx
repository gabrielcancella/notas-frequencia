import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { AlunoCompletoDTO } from "@/models/dto/AlunoCompletoDTO";
import { AlunoService } from "@/services/AlunoService";
import { DialogTitle } from "@radix-ui/react-dialog";
import { queryClient } from "@/components/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { AlunoForm } from "@/components/AlunoForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdicionarAlunoButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [ open, setOpen ] = React.useState(false);
  const [ aluno, setAluno ] = React.useState<AlunoCompletoDTO>({} as AlunoCompletoDTO);

  const { mutate } = useMutation({
    mutationFn: AlunoService.create,
    onSuccess: () => {
      setOpen(false);
      toast.success("Aluno adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao adicionar aluno: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    }
  });

  React.useEffect(() => {
    if (open) {
      setAluno({} as AlunoCompletoDTO);
    }
  }, [ open ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} {...props}>
          Adicionar Aluno
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Adicionar Aluno</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Preencha os detalhes do aluno para adicioná-lo ao sistema.
          </DialogDescription>
          <AlunoForm aluno={aluno} onUpdate={setAluno} onConfirm={mutate} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}