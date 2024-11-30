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
// import { Search } from "lucide-react";

export default function ActivityLogsTable({ data = [] }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <div>{row.original.user.name}</div>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.original.action.split(" ")[0];
        switch (action) {
          case "PUT":
            return <div>Update</div>;
          case "POST":
            return <div>Add</div>;
          case "DELETE":
            return <div>Delete</div>;
          default:
            return <div>Unknown Action</div>;
        }
      },
    },
    {
      accessorKey: "date",
      header: "Date & Time",
      cell: ({ row }) => {
        const date = new Date(row.original.timestamp);
        return (
          <div>
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            ,{" "}
            {date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "activityLog",
      header: "Activity Log",
      cell: ({ row }) => {
        const { action, details, user } = row.original;
        const actionType = action.split(" ")[0];

        let message = "";
        switch (actionType) {
          case "POST":
            if (action.includes("/auth/add-user")) {
              message = `${user.name} added a new user ${details.name}, who is a ${details.userType}.`;
            } else if (action.includes("/inventory/add-item")) {
              message = `${user.name} added a new inventory item to ${details.sub_category} Table.`;
              //   } else if (action.includes("/todo")) {
              //     message = `${user.name} created a new task with the title: ${details.title || 'Untitled'}.`;
            } else if (action.includes("/production/start-new")) {
              message = `${
                user.name
              } started a new cutting production with Roll Number ${
                details.rolls[0]?.rollNo || "Unknown"
              }.`;
            } else if (action.includes("/lifecycle/start-new-lifecycle")) {
              const rollNumbers = details.rolls
                .map((roll) => roll.rollNo)
                .join(", ");
              message = `${user.name} started a new lifecycle with Roll Number(s) ${rollNumbers}.`;
            } else if (action.includes("/issuance/issue-inventory-items")) {
              message = `${user.name} issued new inventory item ${details.inventoryItem} with quantity ${details.quantity}.`;
            }
            break;
          case "PUT":
            if (action.includes("/production/update")) {
              message = `${
                user.name
              } completed cutting production with Roll Number ${
                details.rolls[0]?.rollNo || "Unknown"
              }.`;
            } else if (action.includes("/auth/edit-user")) {
              message = `${user.name} updated user details for ${details.name}.`;
            } else if (action.includes("/inventory/update-item")) {
              message = `${user.name} updated inventory item in ${details.sub_category} Table.`;
            } else if (action.includes("/lifecycle/update")) {
              const rollNumbers = details.rolls
                .map((roll) => roll.rollNo)
                .join(", ");
              message = `${user.name} updated (completed / started) stage in lifecycle with Roll Number ${rollNumbers}.`;
            }
            break;
          case "DELETE":
            if (action.includes("/auth/delete-user")) {
              message = `${user.name} deleted a user with name ${details.name} who was a ${details.userType}.`;
              // } else if (action.includes("/todo/deleteTask")) {
              //   message = `${user.name} deleted a task with the title: ${
              //     details.title || "Untitled"
              //   }.`;
            } else if (action.includes("/inventory/delete-item")) {
              message = `${user.name} deleted an inventory item from ${details.sub_category} Table.`;
            }
            break;
          default:
            message = `Unknown action performed by ${user.name}.`;
            break;
        }

        return <div>{message}</div>;
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
      {/* <div className="mt-4 flex flex-col sm:flex-row justify-between items-center p-2 px-4 gap-4 sm:gap-0">
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
      </div> */}
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
