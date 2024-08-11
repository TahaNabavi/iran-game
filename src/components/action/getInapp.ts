"use server";

import prisma from "../global/prisma";

type Data = {
  inapp_item: {
    logo: string;
  }[];
  pin: boolean;
  title: string;
  logo: string;
};

export async function getSearchInapp(key: string, page: number) {
  const pin = await prisma.inapp.findMany({
    where: {
      pin: true,
    },
    select: {
      pin: true,
      title: true,
      logo: true,
      inapp_item: {
        select: {
          logo: true,
        },
      },
    },
  });
  const data = await prisma.inapp.findMany({
    where: {
      title: {
        contains: key,
      },
      pin: false,
    },
    select: {
      pin: true,
      title: true,
      logo: true,
      inapp_item: {
        select: {
          logo: true,
        },
      },
    },
    skip: (page - 1) * 10,
    take: 10,
  });

  let res: Data[] = [];
  page === 1 &&
    pin.forEach((e) => {
      res.push(e);
    });
  data.forEach((e) => {
    res.push(e);
  });

  return data;
}

export async function getInapp(title: string): Promise<
  | {
      status: 404;
    }
  | {
      status: 200;
      data: {
        id: number;
        title: string;
        logo: string;
        bg: string;
        buy_help_title: string;
        buy_help_body: string;
        buy_username: boolean;
        buy_password: boolean;
        buy_id: boolean;
        buy_name: boolean;
        buy_email: boolean;
        buy_backup_code: boolean;
        inapp_item: {
          inapp_prices: {
            id: number;
            title: string;
            amount: number;
            price_type: {
              to_irr: number;
            };
          }[];
          id: number;
          title: string;
          logo: string;
        }[];
      };
    }
> {
  const data = await prisma.inapp.findUnique({
    where: {
      title: title,
    },
    include: {
      inapp_item: {
        select: {
          id: true,
          title: true,
          logo: true,
          inapp_prices: {
            select: {
              id: true,
              title: true,
              amount: true,
              price_type: {
                select: {
                  to_irr: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (data) {
    return { status: 200, data: data };
  } else {
    return { status: 404 };
  }
}
