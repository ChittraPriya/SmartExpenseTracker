import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export const logoutAction = async () => {
  //delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("You're successfully Logged Out");
  return redirect("/");
};
