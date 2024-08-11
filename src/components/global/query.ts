import getParameter from "./getParameter";

export function setQueries(updates: { key: string; value: string }[]) {
  const befQuery = getParameter(null) || {};

  updates.forEach((update) => {
    befQuery[update.key] = update.value;
  });

  const queryString = new URLSearchParams(befQuery).toString();
  return queryString;
}

export function removeQueries(keys: string[]) {
  const befQuery = getParameter(null) || {};

  keys.forEach((key) => {
    delete befQuery[key];
  });

  const queryString = new URLSearchParams(befQuery).toString();
  return queryString;
}