"use server";

import prisma from "../global/prisma";

type Data = {
  pin: boolean;
  title: string;
  logo: string;
  amount: number;
  app_id: number;
  price_type: {
    to_irr: number;
  };
};

export async function getSearchMarket(
  key: string,
  app_id: number | null,
  page: number
): Promise<
  {
    pin: boolean;
    title: string;
    logo: string;
    amount: number;
    app_id:number;
  }[]
> {
  const pin = await prisma.market.findManyRandom(3, {
    where: {
      pin: true,
    },
    select: {
      pin: true,
      logo: true,
      title: true,
      amount: true,
      app_id: true,
      price_type: {
        select: {
          to_irr: true,
        },
      },
    },
  });

  const data = await prisma.market.findMany({
    where: {
      title: {
        contains: key,
      },
      app_id: app_id ? app_id : undefined,
      pin: false,
    },
    select: {
      pin: true,
      logo: true,
      title: true,
      amount: true,
      app_id: true,
      price_type: {
        select: {
          to_irr: true,
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

  const setting = await prisma.setting.findFirst({
    select: {
      add_price_market: true,
    },
  });

  return res.map((e) => ({
    pin: e.pin,
    title: e.title,
    logo: e.logo,
    app_id: e.app_id,
    amount:
      e.amount * e.price_type.to_irr + (setting ? setting.add_price_market : 0),
  }));
}

export async function getMarketItem(
  title: string,
  app_id: number
): Promise<
  | {
      status: 404;
    }
  | {
      status: 200;
      data: {
        id: number;
        title: string;
        logo: string;
        amount: number;
        app_id:number;
        market_help: string;
      };
    }
> {
  const data = await prisma.market.findUnique({
    where: {
      title: title,
      app_id: app_id,
    },
    select: {
      id: true,
      title: true,
      logo: true,
      amount: true,
      app_id: true,
      price_type: {
        select: {
          country_code: true,
          currency_code: true,
          to_irr: true,
        },
      },
    },
  });

  const mh = await prisma.market_help.findFirst();
  if (data && mh) {
    let res_price = data.amount;

    try {
      const newData = await fetch(
        `https://steamcommunity.com/market/priceoverview/?currency=${data.price_type.currency_code}&country=${data.price_type.country_code}&appid=${data.app_id}&market_hash_name=${data.title}&format=json`
      );

      if (!newData.ok) {
        throw new Error(`HTTP error! status: ${newData.status}`);
      }

      const res = await newData.json();
      const price = parseFloat(
        res.median_price.replace(/[^0-9.]/g, "")
      ) as number;

      if (data.amount !== price) {
        res_price = price;
        await prisma.market.update({
          where: {
            id: data.id,
          },
          data: {
            amount: price,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }

    const setting = await prisma.setting.findFirst({
      select: {
        add_price_market: true,
      },
    });

    return {
      status: 200,
      data: {
        id: data.id,
        title: data.title,
        logo: data.logo,
        app_id: data.app_id,
        amount:
          res_price * data.price_type.to_irr +
          (setting ? setting.add_price_market : 0),
        market_help: mh.body,
      },
    };
  } else {
    return { status: 404 };
  }
}

export async function getItemInMarket(link: string): Promise<
  | {
      status: 11;
    }
  | { status: 200; data: { title: string; app_id: number } }
> {
  const link_splited = link.split("/");
  const market_name_encoded = link_splited.pop();
  const game_app_id = link_splited[link_splited.length - 1];

  async function create(name: string) {
    const price = await fetch(
      `https://steamcommunity.com/market/priceoverview/?currency=1&country=us&appid=${game_app_id}&market_hash_name=${name}&format=json`
    );
    const price_res = await price.json();

    if (price_res.success) {
      const price_m = parseFloat(
        price_res.median_price.replace(/[^0-9.]/g, "")
      ) as number;

      const res = await prisma.market.create({
        data: {
          amount: price_m,
          title: name,
          logo: "",
          app_id: parseInt(game_app_id),
          price_type: {
            connect: {
              currency_code: 1,
            },
          },
        },
      });
      if (res) {
        return {
          title: res.title,
          app_id: parseInt(game_app_id),
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (market_name_encoded) {
    const market_name = decodeURI(market_name_encoded);
    const res = await prisma.market.findUnique({
      where: {
        title: market_name,
      },
      select: {
        title: true,
        app_id: true,
      },
    });
    if (res) {
      return {
        status: 200,
        data: {
          title: res.title,
          app_id: res.app_id,
        },
      };
    } else {
      const created_res = await create(market_name);
      if (created_res !== false) {
        return {
          status: 200,
          data: created_res,
        };
      } else return { status: 11 };
    }
  } else return { status: 11 };
}
