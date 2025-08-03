import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FiltrosAluno, FiltrosAlunoLabels } from "@/models/FiltrosAluno";

export function SelectFiltroAluno({ selected, onChange }: { selected: FiltrosAluno, onChange: (filtro: FiltrosAluno) => void }) {
  return (
    <Select value={selected.toString()} onValueChange={(value) => {
      onChange(Number(value));
    }}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(FiltrosAlunoLabels).map(([key, value]) => (
          <SelectItem
            key={key}
            value={key}
          >
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}