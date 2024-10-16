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
import Options from "./Option";

export default function OngoingCompletedTable({ data = [] }) {
  // const [sorting, setSorting] = useState([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [columnVisibility, setColumnVisibility] = React.useState({});
  // const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      accessorKey: "srNo.",
      header: "Sr no.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "markAsDone",
      header: "Status",
      cell: ({ row }) => {
        const markAsDone = row.original.markAsDone;
        const statusClass = markAsDone ? "bg-green-500" : "bg-yellow-300";
        return (
          <div className={`text-white ${statusClass} p-1 rounded-full`}>
            {markAsDone ? "Completed" : "Ongoing"}
          </div>
        );
      },
    },
    {
      accessorKey: "rollNo",
      header: "Roll no.",
      cell: ({ row }) => (
        <div className="">
          {row.original.rolls.map((roll) => roll.rollNo).join(", ")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Start Date",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.createdAt
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <div className="">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "expectedDeliveryDate",
      header: "Expected Date",
      cell: ({ row }) => (
        <div className="">{row.original.expectedDeliveryDate}</div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Total price",
      cell: ({ row }) => {
        const totalCost = row.original.rolls.reduce(
          (total, roll) => total + roll.noOfPieces * roll.costPrice,
          0
        );
        return <div className="">{totalCost.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "assignTo",
      header: "AssignTo",
      cell: ({ row }) => <div className="">{row.original.assignTo.name}</div>,
    },
    {
      accessorKey: "*",
      header: "",
      cell: ({ row }) => (
        <div>
          <Options id={row.original._id} markAsDone={row.original.markAsDone} />
        </div>
      ),
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
