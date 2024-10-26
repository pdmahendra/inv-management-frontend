import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
// import Options from "../production/Option";
import { Link } from "react-router-dom";

export default function IssuanceRecordsTable({ data = [] }) {
  // const [sorting, setSorting] = useState([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [columnVisibility, setColumnVisibility] = React.useState({});
  // const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "lot",
      header: "Lot No.",
      cell: ({ row }) => <div>{row.original.lot.lotNo}</div>,
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => <div>{row.original.stageDetails.stage}</div>,
    },
    {
      accessorKey: "inventoryItem",
      header: "Inventory Item",
      cell: ({ row }) => <div>{row.original.inventoryItem}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Issued Quantity",
      cell: ({ row }) => <div>{row.original.quantity}</div>,
    },
    // {
    //   accessorKey: "totalQuantity",
    //   header: "Total Quantity",
    //   cell: ({ row }) => <div>{row.original.totalQuantity}</div>,
    // },
    {
      accessorKey: "allotTo",
      header: "Allot To",
      cell: ({ row }) => <div>{row.original.allotTo.name}</div>,
    },
    {
      accessorKey: "allotBy",
      header: "Alloted By",
      cell: ({ row }) => <div>{row.original.allotBy.name}</div>,
    },
    {
      accessorKey: "issuedDate",
      header: "Issued Date",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.issuedDate
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,

    // onRowSelectionChange: setRowSelection,
    // state: {
    //   sorting,
    //   columnFilters,
    //   columnVisibility,
    //   rowSelection,
    // },
  });

  return (
    <div className="border border-gray-300 rounded-3xl mt-6">
      <div className="p-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-14">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-12">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
