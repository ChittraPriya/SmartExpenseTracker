// src/pages/Dashboard.jsx
import { useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import PieChart from "../components/PieChart";
import { useEffect, useState, useMemo } from "react";
import { fetchExpenses, deleteExpense, getCategoryTotals } from "../helpers";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterAmountMin, setFilterAmountMin] = useState("");
  const [filterAmountMax, setFilterAmountMax] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const { userName } = useLoaderData();

  useEffect(() => {
    setExpenses(fetchExpenses());
  }, []);

  const handleAddOrUpdate = (expense) => {
    if (editingExpense) {
      setExpenses((prev) => prev.map((e) => (e.id === expense.id ? expense : e)));
      setEditingExpense(null);
    } else {
      setExpenses((prev) => [expense, ...prev]);
    }
  };

  const handleDelete = (id) => {
    const updated = deleteExpense(id);
    setExpenses(updated);
  };

  const filteredExpenses = useMemo(() => {
    let data = [...expenses];

    if (filterCategory) data = data.filter((e) => e.category === filterCategory);
    if (filterDateFrom) data = data.filter((e) => new Date(e.date) >= new Date(filterDateFrom));
    if (filterDateTo) data = data.filter((e) => new Date(e.date) <= new Date(filterDateTo));
    if (filterAmountMin) data = data.filter((e) => e.amount >= Number(filterAmountMin));
    if (filterAmountMax) data = data.filter((e) => e.amount <= Number(filterAmountMax));

    if (sortOption === "recent") data.sort((a, b) => b.createdAt - a.createdAt);
    else if (sortOption === "highest") data.sort((a, b) => b.amount - a.amount);

    return data;
  }, [expenses, filterCategory, filterDateFrom, filterDateTo, filterAmountMin, filterAmountMax, sortOption]);

  const categoryTotals = useMemo(() => getCategoryTotals(), [expenses]);

  return userName ? (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back, <span className="text-green-600">{userName}</span>
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <AddExpenseForm
          onAdd={handleAddOrUpdate}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold mb-2">Recent Expenses</h2>

        <Table
          expenses={filteredExpenses.slice(0, 10)}
          onEdit={(e) => setEditingExpense(e)}
          onDelete={handleDelete}
        />

        {/* Filters */}
        {/* Filters */}
<div className="bg-gray-50 p-4 rounded-md mt-4">
  <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
    
    {/* 1️⃣ Category & Sort */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-600 text-sm font-medium">Category</label>
      <select
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {Object.keys(categoryTotals).map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="text-gray-600 text-sm font-medium mt-2">Sort By</label>
      <select
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="recent">Most Recent</option>
        <option value="highest">Highest Amount</option>
      </select>
    </div>

    {/* 2️⃣ From & To Date */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-600 text-sm font-medium">From Date</label>
      <input
        type="date"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterDateFrom}
        onChange={(e) => setFilterDateFrom(e.target.value)}
      />

      <label className="text-gray-600 text-sm font-medium mt-2">To Date</label>
      <input
        type="date"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterDateTo}
        onChange={(e) => setFilterDateTo(e.target.value)}
      />
    </div>

    {/* 3️⃣ Min & Max Amount */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-600 text-sm font-medium">Min Amount</label>
      <input
        type="number"
        placeholder="₹0"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterAmountMin}
        onChange={(e) => setFilterAmountMin(e.target.value)}
      />

      <label className="text-gray-600 text-sm font-medium mt-2">Max Amount</label>
      <input
        type="number"
        placeholder="₹1000"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterAmountMax}
        onChange={(e) => setFilterAmountMax(e.target.value)}
      />
    </div>
  </div>
</div>

        <p className="text-gray-500 mt-2 text-sm">
          Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? "s" : ""} matching filters
        </p>

        <PieChart categoryTotals={categoryTotals} />
      </div>
    </div>
  ) : (
    <Intro />
  );
};

export default Dashboard;