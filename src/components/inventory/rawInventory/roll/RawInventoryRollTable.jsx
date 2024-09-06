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
} from "../../../../ui/table";
// import EditItem from "./editItem";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => <div className="">{row.getValue("rollNo")}</div>,
  },
  {
    accessorKey: "sortNo",
    header: "Sort No",
    cell: ({ row }) => <div className="pl-6">{row.getValue("sortNo")}</div>,
  },
  {
    accessorKey: "meter",
    header: "Meter",
    cell: ({ row }) => <div className="pl-3">{row.getValue("meter")}</div>,
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => <div className="pl-3">{row.getValue("grade")}</div>,
  },
//   {
//     accessorKey: "editAction",
//     header: "Edit Action",
//     cell: ({ row }) => <EditItem row={row} />,
//   },
];

export default function RawInventoryRollTable() {
  // const [sorting, setSorting] = useState([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [columnVisibility, setColumnVisibility] = React.useState({});
  // const [rowSelection, setRowSelection] = useState({});

  const data = [
    {
      id: 1,
      rollNo: "R001",
      sortNo: "S001",
      meter: "20",
      grade: "A",
    },
    {
      id: 2,
      rollNo: "R002",
      sortNo: "S002",
      meter: "15",
      grade: "B",
    },
    {
      id: 3,
      rollNo: "R003",
      sortNo: "S003",
      meter: "25",
      grade: "A",
    },
    {
      id: 4,
      rollNo: "R004",
      sortNo: "S004",
      meter: "10",
      grade: "C",
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
