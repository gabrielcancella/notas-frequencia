import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export function AdicionarAluno() {
  const [ open, setOpen ] = React.useState(false);
  

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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}