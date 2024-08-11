import { toast } from "react-toastify";

export async function postData(
  data: object,
  url: string,
  callback: (res: any) => void,
  headers: any = { "Content-Type": "application/json" }
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    callback(await response.json());
  } catch (error) {
    toast.error("failed");
    throw error;
  }
}
