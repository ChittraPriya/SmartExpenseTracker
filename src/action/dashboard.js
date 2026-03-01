import { toast } from "react-toastify";
import { createExpense, waait } from "../helpers";

export const dashboardAction = async ({ request }) => {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      toast.success(`Welcome, ${values.userName}`);
      return null;
    } catch (error) {
      toast.error("Something went wrong");
      return null;
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        category: values.newExpenseCategory,
        amount: values.newExpenseAmount,
        date: values.expenseDate,
        note: values.expenseNote,
      });
      //create Expense
      return toast.success(`Expense ${values.newExpenseCategory} Created!`);
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }
};
