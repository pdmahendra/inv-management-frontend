import * as React from "react";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
} from "../../../../ui/table";
import EditItem from "../accessories/editItem";
import { Search } from "lucide-react";

function Status({ min_limit, quantity }) {
  return (
    <>
      {min_limit < quantity ? (
        <div className="min-w-4 min-h-4 max-w-4 max-h-4 rounded-full bg-green-400"></div>
      ) : (
        <div className="min-w-4 min-h-4 max-w-4 max-h-4 rounded-full bg-red-400"></div>
      )}
    </>
  );
}

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Status
        min_limit={row.getValue("min_limit")}
        quantity={row.getValue("quantity")}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Item Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="pl-6">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "min_limit",
    header: "Minimum_Limit",
    cell: ({ row }) => <div className="pl-3">{row.getValue("min_limit")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="pl-3">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "editAction",
    header: "Edit Action",
    cell: ({ row }) => <EditItem row={row} />,
  },
];

export default function RawInventoryAccessoriesTable({ data = [] }) {
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
    getFilteredRowModel: getFilteredRowModel(),
  });

  const pageCount = Math.ceil(data.length / pageSize);

  return (
    <div className="border border-gray-300 rounded-3xl mt-6">
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center p-2 px-4 gap-4 sm:gap-0">
        <div className="relative flex items-center w-full sm:w-auto">
          <Search className="absolute left-4 text-gray-400 pointer-events-none" />
          <input
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
            placeholder="Search Item Name"
          />
        </div>
      </div>
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
