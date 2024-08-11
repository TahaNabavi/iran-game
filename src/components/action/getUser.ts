"use server";

import { verifyJwt } from "../global/jwt";
import prisma from "../global/prisma";

export async function getUserData(token: string) {
  if (!token) return { status: 401 };
  const jwt = await verifyJwt(token);
  if (!jwt) return { status: 401 };

  const user = await prisma.users.findUnique({
    where: {
      id: jwt.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  if (!user) {
    return { status: 401 };
  }

  return { status: 200, data: user };
}
