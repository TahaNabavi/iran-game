import { formControlClasses } from "@mui/material";
import { getUserLogedIn } from "../action/getAuth";
import { CookGet } from "./cookie";

function lunch() {
  const dialogs = document.querySelectorAll("dialog");
  dialogs.forEach((e) => {
    e.close();
  });
  const authDialog = document.querySelector("#auth-modal") as HTMLDialogElement;
  authDialog?.showModal();
  return false;
}

export default async function auth() {
  const jwt = CookGet("jwt");
  if (!jwt) {
    return lunch();
  } else {
    const res = await getUserLogedIn(jwt);
    if (res) {
      return true;
    } else {
      return lunch();
    }
  }
}
