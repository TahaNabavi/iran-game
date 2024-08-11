export default function getParameter<T extends string | null>(
  name: T
): T extends string ? string | null : { [key: string]: string } | null {
  const url = window.location.href;
  const queryParams = url.split("?")[1];
  if (name === null) {
    const params: { [key: string]: string } = {};
    if (queryParams) {
      const pairs = queryParams.split("&");
      pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }
    return params as T extends string ? never : { [key: string]: string };
  }
  const paramRegex = new RegExp(`[?&]${name}=([^&]*)`);
  const match = url.match(paramRegex);
  return match && (match[1] as T extends string ? string | null : never);
}
