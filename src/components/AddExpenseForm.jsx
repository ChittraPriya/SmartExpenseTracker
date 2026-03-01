import React, { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createExpense, updateExpense } from "../helpers";

const categories = [
  "Food",
  "Travel",
  "Bills",
  "Rent",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Fuel",
  "Others",
];

const AddExpenseForm = ({ onAdd, editingExpense, onCancelEdit }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        category: editingExpense.category,
        amount: editingExpense.amount,
        date: editingExpense.date.split("T")[0],
        note: editingExpense.note || "",
      });
      focusRef.current.focus();
    } else {
      setFormData({ category: "", amount: "", date: "", note: "" });
    }
  }, [editingExpense]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExpense) {
      //Update expense
      const updated = updateExpense({
        id: editingExpense.id,
        ...formData,
      });
      onAdd(updated);
      toast.success(`Expense "${updated.category}" updated!`);
      if (onCancelEdit) onCancelEdit(); // clear editing state
    } else {
      const newExpense = createExpense(formData);
      onAdd(newExpense);
      toast.success(`Expense "${newExpense.category}" added!`);
    }

    // Reset form
    setFormData({ category: "", amount: "", date: "", note: "" });
  };

  return (
    <div className="max-w-[800px] mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200 grid gap-6">
      <h2 className="text-xl font-bold text-gray-800">
        {editingExpense ? "Edit Expense" : "Add Expense Here"}
      </h2>

      <form onSubmit={handleSubmit} ref={formRef} className="grid gap-5">
        {/* Category */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Expense Category
          </label>
          <select
            name="category"
            id="category"
            ref={focusRef}
            required
            value={formData.category}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            id="amount"
            placeholder="E.g., ₹500"
            required
            value={formData.amount}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Note */}
        <div className="flex flex-col gap-1">
          <label htmlFor="note" className="text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            name="note"
            id="note"
            placeholder="Add a note (optional)"
            rows="3"
            value={formData.note}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
            disabled={isSubmitting}
          >
            <CurrencyRupeeIcon className="w-5 h-5" />
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>
          {editingExpense && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
  f;
};

export default AddExpenseForm;
