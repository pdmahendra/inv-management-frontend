import React from "react";

export const Table= ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">{children}</table>
  </div>
);

export const TableHeader= ({ children }) => (
  <thead className="border-b-2 text-center">{children}</thead>
);

export const TableHead = ({ className, scope, children, ...props }) => (
  <th
    className={`px-4 py-3 text-left text-xs font-medium text-bold uppercase tracking-wider ${className}`}
    scope={scope}
    {...props}
  >
    {children}
  </th>
);

export const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-300">{children}</tbody>
);

export const TableRow = ({ className, children, ...props }) => (
  <tr className={className} {...props}>
    {children}
  </tr>
);

export const TableCell = ({ className, children, ...props }) => (
  <td className={`px-5 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </td>
);
