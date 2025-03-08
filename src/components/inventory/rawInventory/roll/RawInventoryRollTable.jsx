"use client";
import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { flexRender } from "@tanstack/react-table";
import EditItem from "../roll/editIRolltem";
import FormDialog from "./RollDialog";
import { Button } from "@mui/material";
import { useBulkUpdatePrices } from "../../../../api/query/inventory/invetoryApi";
const RawInventoryRollTable = ({ data, refetch }) => {
  const [bulkEdit, setBulkEdit] = React.useState(null);
  const [newPrice, setNewPrice] = React.useState("");

  const handleBulkEdit = (sortNumber) => {
    setBulkEdit(sortNumber);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };
  const { mutate: updatePrices, isLoading } = useBulkUpdatePrices();
  const applyBulkEdit = (sortNumber) => {
    updatePrices(
      { sortNumber, newPrice },
      {
        onSuccess: () => {
          setBulkEdit(null);
          refetch(); // Refresh data after update
        },
        onError: (error) => {
          console.error("Error updating prices:", error.message);
        },
      }
    );
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "extra_fields",
      header: "Roll No",
      cell: ({ row }) => (
        <div>{row.original.extra_fields?.[0]?.roll_number}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>{row.original.price}</div>,
    },
    {
      accessorKey: "extra_fields",
      header: "Meter",
      cell: ({ row }) => <div>{row.original.extra_fields?.[2]?.meter}</div>,
    },
    {
      accessorKey: "extra_fields",
      header: "Grade",
      cell: ({ row }) => <div>{row.original.extra_fields?.[3]?.grade}</div>,
    },
    {
      accessorKey: "editAction",
      header: "Edit Action",
      cell: ({ row }) => <EditItem row={row} />,
    },
    {
      accessorKey: "Duplicate Action",
      header: "Duplicate",
      cell: ({ row }) => (
        <div className="mt-4">
          <FormDialog refetch={refetch} duplicate={row} />
        </div>
      ),
    },
  ];

  const uniqueSortNumbers = Array.from(
    new Set(data.map((item) => item.extra_fields?.[1]?.sort_number))
  );

  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Roll Inventory (Grouped by Sort Number)
      </h2>

      <Accordion.Root type="multiple" className="w-full space-y-4">
        {uniqueSortNumbers.map((sortNumber, index) => {
          const filteredData = data.filter(
            (item) => item.extra_fields?.[1]?.sort_number === sortNumber
          );

          return (
            <Accordion.Item key={index} value={`sort-${sortNumber}`}>
              <Accordion.Header>
                <Accordion.Trigger className="text-lg font-semibold cursor-pointer">
                  Sort Number: {sortNumber}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <div className="mt-4 flex items-center gap-4">
                  <FormDialog refetch={refetch} sortNumber={sortNumber} />
                  {bulkEdit === sortNumber ? (
                    <>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={handlePriceChange}
                        className="border p-2 rounded"
                        placeholder="Enter new price"
                      />
                      <Button onClick={() => applyBulkEdit(sortNumber)}>
                        Apply
                      </Button>
                      <Button
                        onClick={() => setBulkEdit(null)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleBulkEdit(sortNumber)}>
                      Bulk Edit Price
                    </Button>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column.accessorKey}>
                          {column.header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <TableCell key={colIndex}>
                            {flexRender(column.cell, {
                              row: { original: row, index: rowIndex },
                            })}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
};

export default RawInventoryRollTable;
