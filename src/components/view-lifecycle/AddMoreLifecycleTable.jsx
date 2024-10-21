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

export const columns = [
  {
    accessorKey: "srNo.",
    header: "Sr no.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "rollNo",
    header: "Roll no.",
    cell: ({ row }) => <div className="pl-6">{row.original.rollNo}</div>,
  },
  {
    accessorKey: "sort",
    header: "Sort",
    cell: ({ row }) => <div className="pl-3">{row.original.sort}</div>,
  },
  {
    accessorKey: "meter",
    header: "Meter",
    cell: ({ row }) => <div className="pl-6">{row.original.meter}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="pl-3">{row.original.price}</div>,
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => <div className="pl-3">{row.original.grade}</div>,
  },
  {
    accessorKey: "noOfPieces",
    header: "No. of Pieces",
    cell: ({ row }) => <div className="pl-3">{row.original.noOfPieces}</div>,
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => <div className="pl-3">{row.original.costPrice}</div>,
  },
  {
    accessorKey: "totalPrice",
    header: "Total Cost",
    cell: ({ row }) => {
      const noOfPieces = Number(row.original.noOfPieces);
      const costPrice = Number(row.original.costPrice);
      const totalCost = noOfPieces * costPrice;
      return <div className="pl-3">₹ {totalCost}</div>;
    },
  },
];

export default function AddMoreLifecycleTable({ data = [] }) {
  // const [sorting, setSorting] = useState([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [columnVisibility, setColumnVisibility] = React.useState({});
  // const [rowSelection, setRowSelection] = useState({});

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
