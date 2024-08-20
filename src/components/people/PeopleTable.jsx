import React, { useState } from "react";
import EditUser from "../people/EditUser";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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

// Define the columns
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => <div>{getValue("name")}</div>,
  },
  {
    accessorKey: "userType",
    header: "Role",
    cell: ({ getValue }) => <div className="pl-6">{getValue("userType")}</div>,
  },
  {
    accessorKey: "phoneNo",
    header: "Phone",
    cell: ({ getValue }) => <div className="pl-3">{getValue("phoneNo")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ getValue }) => (
      <div className="underline">{getValue("username")}</div>
    ),
  },
  {
    accessorKey: "*",
    header: "Action",
    cell: ({ row }) => <EditUser row={row} />,
  },
];

export default function PeopleTable({ data = [] }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageCount = Math.ceil(data.length / pageSize);

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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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

        <div className="flex justify-center mt-4">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPageIndex(i)}
              className={`px-2 m-3 rounded ${
                pageIndex === i
                  ? "text-black border-2 rounded-xl"
                  : "text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
