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

export default function OngoingWaitingCompletedTable({ data = [], heading }) {
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
      cell: ({ row }) => (
        <div className="">
          {row.original.rolls.map((roll) => roll.rollNo).join(", ")}
        </div>
      ),
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => {
        const stages = row.original.stages;
        const lastStage =
          stages.length > 0 ? stages[stages.length - 1].stage : "No stage";
        return <div>{lastStage}</div>;
      },
    },
    {
      accessorKey: "startTime",
      header: "Start Date",
      cell: ({ row }) => {
        const stages = row.original.stages;
        const lastStage = stages.length > 0 ? stages[stages.length - 1] : null;
        const formattedDate =
          lastStage && lastStage.startTime
            ? new Date(lastStage.startTime).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "No start time";

        return <div className="">{formattedDate}</div>;
      },
    },
    {
      accessorKey: heading === "Waiting" ? "endTime" : "expectedDeliveryDate",
      header: heading === "Waiting" ? "End Date" : "Expected Date",
      cell: ({ row }) => {
        const stages = row.original.stages;
        const lastStage = stages.length > 0 ? stages[stages.length - 1] : null;
        return <div>{lastStage?.expectedDeliveryDate}</div>;
      },
    },
    // {
    //   accessorKey: "totalPrice",
    //   header: "Total price",
    //   cell: ({ row }) => {
    //     const totalCost = row.original.rolls.reduce(
    //       (total, roll) => total + roll.noOfPieces * roll.costPrice,
    //       0
    //     );
    //     return <div className="">{totalCost.toFixed(2)}</div>;
    //   },
    // },
    {
      accessorKey: "assignTo",
      header: "Assign To",
      cell: ({ row }) => {
        const stages = row.original.stages;
        const lastStage = stages.length > 0 ? stages[stages.length - 1] : null;

        return (
          <div>
            {lastStage?.assignTo ? lastStage.assignTo?.name : lastStage?.name}
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNo",
      header: "Phone Number",
      cell: ({ row }) => {
        const stages = row.original.stages;
        const lastStage = stages.length > 0 ? stages[stages.length - 1] : null;
        return (
          <div>
            {lastStage?.assignTo
              ? lastStage?.assignTo?.phoneNo
              : lastStage?.contact}
          </div>
        );
      },
    },
    {
      accessorKey: "*",
      header: "",
      cell: ({ row }) => {
        const lastStage =
          row.original.stages.length > 0
            ? row.original.stages[row.original.stages.length - 1]
            : null;

        const stageId = lastStage ? lastStage._id : null;

        return (
          <Link to={`details/${row.original._id}`}>
            View Details
          </Link>
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
