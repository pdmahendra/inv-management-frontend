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
import Options from "../production/Option";
import { Link } from "react-router-dom";

export default function CompletedLifecycleAlotTable({ data = [], heading }) {
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
      accessorKey: "lotNo",
      header: "Lot No.",
      cell: ({ row }) => <div>{row.original.lotNo}</div>,
    },
    {
      accessorKey: "rollNo",
      header: "Roll no.",
      cell: ({ row }) => <div>{row.original.rollNo}</div>,
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => {
        return <div>{row.original.stage}</div>;
      },
    },
    {
      accessorKey: "price",
      header: "price",
      cell: ({ row }) => {
        return <div>₹ {row.original.price}</div>;
      },
    },
    {
      accessorKey: "startTime",
      header: "Start Date",
      cell: ({ row }) => {
        const stages = row.original.startTime;
        const formattedDate =
          stages && stages
            ? new Date(stages).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "No start time";

        return <div className="">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "End Date",
      cell: ({ row }) => {
        const formattedDate = row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "No date available";

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "assignTo",
      header: "Assign To",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.assignTo
              ? row.original.assignTo.name
              : row.original.name}
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNo",
      header: "Phone Number",
      cell: ({ row }) => {
        return (
          <div>
            {" "}
            {row.original.assignTo
              ? row.original.assignTo.phoneNo
              : row.original.contact}
          </div>
        );
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
