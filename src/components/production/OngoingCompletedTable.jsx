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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="">{row.original.status}</div>,
  },
  {
    accessorKey: "rollNo",
    header: "Roll no.",
    cell: ({ row }) => <div className="pl-6">{row.original.rollNo}</div>,
  },
  {
    accessorKey: "expectedDate",
    header: "Expected Date",
    cell: ({ row }) => <div className="pl-3">{row.original.expectedDate}</div>,
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
    cell: ({ row }) => <div className="pl-3">{row.getValue("totalPrice")}</div>,
  },
  {
    accessorKey: "assignTo",
    header: "AssignTo",
    cell: ({ row }) => <div className="pl-3">{row.original.assignTo}</div>,
  },
];

const data = [
    {
      status: "Ongoing",
      rollNo: "101",
      expectedDate: "2024-10-10",
      totalPrice: "$200",
      assignTo: "Pratik",
    },
    {
      status: "Completed",
      rollNo: "102",
      expectedDate: "2024-10-12",
      totalPrice: "$150",
      assignTo: "Ayur",
    },
    {
      status: "Pending",
      rollNo: "103",
      expectedDate: "2024-10-15",
      totalPrice: "$300",
      assignTo: "Ankush",
    },
    {
      status: "Ongoing",
      rollNo: "104",
      expectedDate: "2024-10-20",
      totalPrice: "$250",
      assignTo: "John",
    },
    {
      status: "Completed",
      rollNo: "105",
      expectedDate: "2024-10-25",
      totalPrice: "$400",
      assignTo: "Jane",
    },
  ];

export default function OngoingCompletedTable() {
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
