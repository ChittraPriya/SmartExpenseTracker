import { fetchData } from "../helpers";

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}
