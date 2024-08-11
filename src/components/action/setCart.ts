"use server";

import { verifyJwt } from "../global/jwt";
import prisma from "../global/prisma";

export async function setNewCart(
  token: string,
  data:
    | {
        type: "dlc";
        username: string;
        password: string;
        backup_code: string | null;
        dlc_id: number;
        price_id: number;
      }
    | {
        type: "game";
        username: string;
        password: string;
        backup_code: string | null;
        game_id: number;
        price_id: number;
      }
    | {
        type: "inapp";
        username: string | null;
        password: string | null;
        acc_id: string | null;
        acc_name: string | null;
        email: string | null;
        inapp_prices_id: number;
      }
    | {
        type: "market";
        trade_link: string;
        market_id: number;
      }
): Promise<{
  status: 200 | 401 | 10;
}> {
  if (!token) return { status: 401 };
  const jwt = await verifyJwt(token);
  if (!jwt) return { status: 401 };

  if (data.type === "dlc") {
    const res = await prisma.cart.create({
      data: {
        user_id: jwt.id,
        dlc_id: data.dlc_id,
        price_id: data.price_id,
        type: data.type,
        username: data.username,
        password: data.password,
        backup_code: data.backup_code,
      },
    });
    return { status: 200 };
  } else if (data.type === "game") {
    const res = await prisma.cart.create({
      data: {
        user_id: jwt.id,
        game_id: data.game_id,
        price_id: data.price_id,
        type: data.type,
        username: data.username,
        password: data.password,
        backup_code: data.backup_code,
      },
    });
    return { status: 200 };
  } else if (data.type === "inapp") {
    const res = await prisma.cart.create({
      data: {
        user_id: jwt.id,
        type: data.type,
        username: data.username,
        password: data.password,
        email: data.email,
        acc_id: data.acc_id,
        acc_name: data.acc_name,
        inapp_price_id: data.inapp_prices_id,
      },
    });
    return { status: 200 };
  } else if (data.type === "market") {
    const res = await prisma.cart.create({
      data: {
        user_id: jwt.id,
        type: data.type,
        trade_link: data.trade_link,
        market_id: data.market_id,
      },
    });
    return { status: 200 };
  } else return { status: 10 };
}

export async function getCartCount(token: string): Promise<
  | {
      status: 401;
    }
  | {
      status: 200;
      data: number;
    }
> {
  if (!token) return { status: 401 };
  const jwt = await verifyJwt(token);
  if (!jwt) return { status: 401 };

  const res = await prisma.cart.count({
    where: {
      user_id: jwt.id,
    },
  });

  return { status: 200, data: res };
}

type DGame = {
  type: "game";
  id: number;
  username: string | null;
  password: string | null;
  backup_code: string | null;
  amount: number;
  region: string;
  game: {
    title: string;
    logo: string;
  };
};
type DDlc = {
  type: "dlc";
  id: number;
  username: string | null;
  password: string | null;
  backup_code: string | null;
  amount: number;
  region: string;
  dlc: {
    title: string;
    image: string;
    game: {
      title: string;
      logo: string;
    };
  };
};
type DInapp = {
  type: "inapp";
  id: number;
  username: string | null;
  password: string | null;
  email: string | null;
  acc_id: string | null;
  acc_name: string | null;
  backup_code: string | null;
  amount: number;
  region: string;
  inapp: {
    item_logo: string;
    title: string;
    logo: string;
  };
};
type DMarket = {
  type: "market";
  id: number;
  trade_link: string | null;
  amount: number;
  region: string;
  market: {
    title: string;
    logo: string;
  };
};
type CartInfo = DGame | DDlc | DInapp | DMarket;
export async function getCartInfo(token: string) {
  if (!token) return { status: 401 };
  const jwt = await verifyJwt(token);
  if (!jwt) return { status: 401 };

  const added_price = await prisma.setting.findFirst({
    select: {
      add_price_market: true,
    },
  });

  const carts = await prisma.cart.findMany({
    where: {
      user_id: jwt.id,
      status: 0,
    },
    select: {
      id: true,
      type: true,
      username: true,
      password: true,
      email: true,
      acc_id: true,
      acc_name: true,
      trade_link: true,
      backup_code: true,
      dlc: {
        select: {
          name: true,
          image: true,
          discount: true,
          game: {
            select: {
              title: true,
              logo: true,
            },
          },
        },
      },
      game: {
        select: {
          title: true,
          logo: true,
          discount: true,
        },
      },
      market: {
        select: {
          amount: true,
          title: true,
          logo: true,
          price_type: {
            select: {
              name: true,
              to_irr: true,
            },
          },
        },
      },
      inapp_price: {
        select: {
          title: true,
          amount: true,
          price_type: {
            select: {
              name: true,
              to_irr: true,
            },
          },
          inapp_item: {
            select: {
              logo: true,
              inapp: {
                select: {
                  title: true,
                  logo: true,
                },
              },
            },
          },
        },
      },
      price: {
        select: {
          amount: true,
          price_type: {
            select: {
              to_irr: true,
              name: true,
            },
          },
        },
      },
    },
  });

  let res: CartInfo[] = [];

  carts.map((e) => {
    if (e.type === "game") {
      if (e.game && e.price) {
        let amount = 0;
        if (e.game.discount === 0) {
          amount = e.price.amount * e.price.price_type.to_irr;
        } else {
          amount =
            e.price.amount * e.price.price_type.to_irr -
            ((e.price.amount * e.price.price_type.to_irr) / 100) *
              e.game.discount;
        }
        res.push({
          type: "game",
          id: e.id,
          username: e.username,
          password: e.password,
          backup_code: e.backup_code,
          amount: amount,
          region: e.price.price_type.name,
          game: {
            title: e.game.title,
            logo: e.game.logo,
          },
        } as DGame);
      }
    } else if (e.type === "dlc") {
      if (e.dlc && e.price) {
        let amount = 0;
        if (e.dlc.discount === 0) {
          amount = e.price.amount * e.price.price_type.to_irr;
        } else {
          amount =
            e.price.amount * e.price.price_type.to_irr -
            ((e.price.amount * e.price.price_type.to_irr) / 100) *
              e.dlc.discount;
        }
        res.push({
          type: "dlc",
          id: e.id,
          username: e.username,
          password: e.password,
          backup_code: e.backup_code,
          amount: amount,
          region: e.price.price_type.name,
          dlc: {
            title: e.dlc.name,
            image: e.dlc.image,
            game: {
              title: e.dlc.game[0].title,
              logo: e.dlc.game[0].logo,
            },
          },
        } as DDlc);
      }
    } else if (e.type === "inapp") {
      if (e.inapp_price) {
        res.push({
          type: "inapp",
          id: e.id,
          username: e.username,
          password: e.password,
          email: e.email,
          acc_id: e.acc_id,
          acc_name: e.acc_name,
          backup_code: e.backup_code,
          amount: e.inapp_price.amount * e.inapp_price.price_type.to_irr,
          region: e.inapp_price.price_type.name,
          inapp: {
            item_logo: e.inapp_price.inapp_item.logo,
            title: e.inapp_price.inapp_item.inapp.title,
            logo: e.inapp_price.inapp_item.inapp.logo,
          },
        } as DInapp);
      }
    } else if (e.type === "market") {
      if (e.market && added_price) {
        res.push({
          type: "market",
          id: e.id,
          trade_link: e.trade_link,
          amount:
            e.market.amount * e.market.price_type.to_irr +
            added_price.add_price_market,
          region: e.market.price_type.name,
          market: {
            title: e.market.title,
            logo: e.market.logo,
          },
        } as DMarket);
      }
    }
  });

  return { status: 200, data: res };
}

export async function setCartCancel(token: string, id: number) {
  if (!token) return { status: 401 };
  const jwt = await verifyJwt(token);
  if (!jwt) return { status: 401 };

  const res = await prisma.cart.delete({
    where: {
      user_id: jwt.id,
      id: id,
    },
  });
  if (res) return { status: 200 };
  else return { status: 11 };
}
