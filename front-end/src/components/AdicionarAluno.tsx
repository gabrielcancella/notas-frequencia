import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlunoCompletoDTO } from "@/models/dto/AlunoCompletoDTO";
import { AlunoForm } from "./AlunoForm";
import { useMutation } from "@tanstack/react-query";
import { AlunoService } from "@/services/AlunoService";
import { toast } from "sonner";
import { queryClient } from "./QueryClientProvider";

export function AdicionarAluno() {
  const [ open, setOpen ] = React.useState(false);
  const [ aluno, setAluno ] = React.useState<AlunoCompletoDTO>({} as AlunoCompletoDTO);

  const { mutate } = useMutation({
    mutationFn: AlunoService.create,
    onSuccess: () => {
      setOpen(false);
      toast.success("Aluno adicionado com sucesso!");
    },
    onError: (error) => {
      setOpen(false);
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
        <Button variant="outline" onClick={() => setOpen(true)}>
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