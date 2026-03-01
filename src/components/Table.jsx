import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const Table = ({ expenses = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Category", "Amount", "Date", "Note", "Edit", "Delete"].map(
              (header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr
                key={expense.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2 whitespace-nowrap text-gray-800 font-medium">
                  {expense.category}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                  ₹{expense.amount}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-gray-500 text-sm">
                  {expense.note || "-"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
