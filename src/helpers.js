export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

//Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//create Expense
export const createExpense = ({ category, amount, date, note = "" }) => {
  const newItem = {
    id: crypto.randomUUID(),
    category,
    amount: Number(amount),
    date: date || Date.now(),
    note,
    createdAt: Date.now(),
  };

  const existingExpenses = fetchData("expenses") ?? [];

  localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem]),
  );

  return newItem;
};

//fetch expenses
export const fetchExpenses = () => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

// Update an existing expense
export const updateExpense = ({ id, category, amount, date, note }) => {
  const existingExpenses = fetchExpenses();
  const updatedExpenses = existingExpenses.map((exp) =>
    exp.id === id
      ? { ...exp, category, amount: Number(amount), date, note }
      : exp,
  );

  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  return updatedExpenses.find((exp) => exp.id === id);
};

//  Delete an expense
export const deleteExpense = (id) => {
  const existingExpenses = fetchExpenses();
  const updatedExpenses = existingExpenses.filter((exp) => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  return updatedExpenses;
};

export const getCategoryTotals = () => {
  const expenses = fetchExpenses();
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });
  return totals;
};

//delete user
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
