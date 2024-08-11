import Cookies from "js-cookie";
/**
 *
 * @param {*} key cookie key
 * @param {*} val cookie data
 */
function CookSet(key: string, val: string) {
  Cookies.set(key, val, {
    expires: 7,
    path: "/",
    secure: true,
  });
}
/**
 *
 * @param {*} key cookie key
 * @returns return the cookie value
 */
function CookGet(key: string) {
  const data = Cookies.get(key);
  return data;
}
/**
 *
 * @param {*} key cookie key
 */
function CookRemove(key: string) {
  Cookies.remove(key);
}
export { CookSet, CookGet, CookRemove };
