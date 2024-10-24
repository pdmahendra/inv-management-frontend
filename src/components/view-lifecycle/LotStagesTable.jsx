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
import Options from "./Options";

export default function LotStagesTable({ data = [] }) {
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
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => <div>{row.original.stage}</div>,
    },
    {
      accessorKey: "startTime",
      header: "Start Date",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.startTime
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "expectedDeliveryDate",
      header: "Expected Delivery Date",
      cell: ({ row }) => <div>{row.original.expectedDeliveryDate}</div>,
    },
    {
      accessorKey: "endTime",
      header: "End Date",
      cell: ({ row }) => {
        const formattedDate = row.original.endTime
          ? new Date(row.original.endTime).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "-";
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "isCompleted",
      header: "Status",
      cell: ({ row }) => {
        const isCompleted = row.original.isCompleted;
        const today = new Date().toLocaleDateString("en-GB");
        const isDelayed = row.original.expectedDeliveryDate < today;

        let statusClass, statusText;
        if (isCompleted) {
          statusClass = "bg-green-500";
          statusText = "Completed";
        } else if (isDelayed) {
          statusClass = "bg-red-500";
          statusText = "Delayed";
        } else {
          statusClass = "bg-yellow-300";
          statusText = "Ongoing";
        }

        return (
          <div className={`text-white ${statusClass} p-1 px-2 rounded-full`}>
            {statusText}
          </div>
        );
      },
    },
    {
      accessorKey: "assignTo.name",
      header: "Assigned To",
      cell: ({ row }) => (
        <div>{row.original.assignTo?.name || row.original.name}</div>
      ),
    },
    {
      accessorKey: "assignTo.phoneNo",
      header: "Phone Number",
      cell: ({ row }) => (
        <div>{row.original.assignTo?.phoneNo || row.original.contact}</div>
      ),
    },
    {
      accessorKey: "additionalInformation",
      header: "Additional Information",
      cell: ({ row }) => <div>{row.original.additionalInformation || "-"}</div>,
    },
    {
      accessorKey: "*",
      header: "",
      cell: ({ row }) => (
        <div>
          <Options stageId={row.original._id} />
        </div>
      ),
    },
  ];

  // Conditionally add the Options column
  //    if (heading !== "Completed") {
  //     columns.push({
  //       accessorKey: "*",
  //       header: "",
  //       cell: ({ row }) => (
  //         <div>
  //           <Options
  //             id={row.original._id}
  //             markAsDone={row.original.markAsDone}
  //             row={row.original}
  //           />
  //         </div>
  //       ),
  //     });
  //   }

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
