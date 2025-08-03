"use client"

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "./skeleton";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [ pagination, setPagination ] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    state: {
      pagination: pagination,
    }
  });

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="overflow-hidden rounded-md border flex-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={i}>
                {headerGroup.headers.map((header, j) => {
                  return (
                    <TableHead key={j}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row, i) => (
                  <TableRow
                    key={i}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, j) => (
                      <TableCell key={j}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {Array.from({ length: pagination.pageSize - table.getRowModel().rows.length }).map((_, i) => (
                  <TableRow key={i} className="pointer-events-none" >
                    <TableCell className="h-12">
                      <Button variant={"ghost"} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div>
          {!isLoading ? (
            <span className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} resultado(s) encontrado(s)
            </span>
          ) : (
            <Skeleton className="h-4 w-40" />
          )}
        </div>
        <div>
          {!isLoading ? (
            <span className="text-sm text-muted-foreground">
              Página {pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
          ) : (
            <Skeleton className="h-4 w-24" />
          )}
        </div>
        <div className="flex gap-2">
          {!isLoading ? (<>
            <Button variant={"outline"} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Voltar</Button>
            <Button variant={"outline"} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Próxima</Button>
          </>) : (
            <Skeleton className="h-4 w-40" />
          )}
        </div>
      </div>
    </div>
  )
}