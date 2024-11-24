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
} from "../../ui/table";
// import Options from "../production/Option";
import { Search } from "lucide-react";

export default function IssuanceRecordsTable({ data = [] }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

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
      cell: ({ row }) => <div>{row.original?.allotTo?.name}</div>,
    },
    {
      accessorKey: "allotBy",
      header: "Alloted By",
      cell: ({ row }) => <div>{row.original?.allotBy?.name}</div>,
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
            value={table.getColumn("inventoryItem")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("inventoryItem")
                ?.setFilterValue(event.target.value)
            }
            className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
            placeholder="Search Inventory Item"
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
