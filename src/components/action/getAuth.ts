"use server";

import { hash, verifyHash } from "../global/hash";
import { createJwt, verifyJwt } from "../global/jwt";
import prisma from "../global/prisma";

/**
 * Generates a unique username based on the provided email, last name, and first name.
 *
 * @param {string} email - The user's email address.
 * @param {string} lastName - The user's last name.
 * @param {string} firstName - The user's first name.
 * @returns {string} A unique username.
 */
function generateUsername(email: string, lastName: string, firstName: string) {
  // Create a base username by concatenating the first name and last name
  let baseUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

  // ! =========
  baseUsername = "";
  // ! =========

  // If the email address is provided, append a portion of it to the base username
  if (email) {
    const emailPart = email.split("@")[0].toLowerCase();
    baseUsername += `.${emailPart}`;
  }

  // Replace any non-alphanumeric characters with underscores
  baseUsername = baseUsername.replace(/[^a-z0-9]/g, "_");

  // If the username is still not unique, append a random number to it
  const username = "@" + baseUsername + Math.floor(Math.random() * 1000);

  return username;
}

export async function getUserLogedIn(token: string) {
  const jwt = await verifyJwt(token);
  if (!jwt) {
    return false;
  }

  const user = await prisma.users.findUnique({
    where: {
      id: jwt.id,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    return false;
  }

  return true;
}

export async function getLogin(email: string, password: string) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
      username: true,
    },
  });

  if (!user) {
    return { status: 10 };
  } else {
    const verify = await verifyHash(password, user.password);
    if (!verify) {
      return { status: 10 };
    } else {
      const jwt = createJwt({
        id: user.id,
        username: user.username,
      });
      return { status: 200, data: jwt };
    }
  }
}
export async function getEmailVerifyGoogle(
  email: string,
  token_id: string
): Promise<
  | {
      status: 200;
      data: string;
      new: boolean;
    }
  | {
      status: 10 | 11;
    }
> {
  const verifyEmailUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${token_id}`;
  try {
    const response = await fetch(verifyEmailUrl);
    const userData = await response.json();

    if (userData.email === email) {
      const user = await prisma.users.findUnique({
        where: {
          email: userData.email,
        },
        select: {
          id: true,
          username: true,
        },
      });
      if (user) {
        const jwt = createJwt({
          id: user.id,
          username: user.username,
        });
        return { status: 200, data: jwt, new: false };
      } else {
        const createUser = await prisma.users.create({
          data: {
            username: generateUsername(
              userData.email,
              userData.family_name,
              userData.given_name
            ),
            email: userData.email,
            password: "",
            avatar: userData.picture,
          },
          select: {
            id: true,
            username: true,
          },
        });
        if (createUser) {
          const jwt = createJwt({
            id: createUser.id,
            username: createUser.username,
          });
          return { status: 200, data: jwt, new: true };
        } else return { status: 10 };
      }
    } else return { status: 11 };
  } catch (error) {
    return { status: 11 };
  }
}
