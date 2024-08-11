import jwt from "jsonwebtoken";

type user = { id: number; username: string };

export const createJwt = (payload: user) =>
  jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: "7d" });

export const verifyJwt = (token: string): Promise<user | undefined> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY as string, (err, payload) => {
      if (err) {
        resolve(undefined);
      } else {
        resolve(payload as user);
      }
    });
  });
