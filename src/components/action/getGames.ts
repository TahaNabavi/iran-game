"use server";

import prisma from "../global/prisma";

export async function getMainGames() {
  const top = await prisma.games.findMany({
    where: {
      isTop: {
        equals: 1,
      },
    },
    select: {
      tags: {
        select: {
          name: true,
        },
      },
      title: true,
      logo: true,
      description: true,
      discount: true,
      image_one: true,
      image_two: true,
      image_three: true,
      prices: {
        where: {
          price_type: {
            currency: "USD",
          },
        },
        select: {
          id: true,
          pt_id: true,
          amount: true,
          price_type: true,
        },
        take: 1,
      },
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
  });
  const game = await prisma.games.findManyRandom(6, {
    select: {
      tags: {
        select: {
          name: true,
        },
      },
      title: true,
      logo: true,
      discount: true,
      image_one: true,
      prices: {
        where: {
          price_type: {
            currency: "USD",
          },
        },
        select: {
          id: true,
          pt_id: true,
          amount: true,
          price_type: true,
        },
        take: 1,
      },
    },
  });
  const inapp = await prisma.inapp.findManyRandom(6, {
    select: {
      title: true,
      logo: true,
      inapp_item: {
        select: {
          logo: true,
        },
      },
    },
  });
  const market = await prisma.market.findManyRandom(12, {
    select: {
      logo: true,
      title: true,
      amount: true,
      game: {
        select: {
          app_id: true,
        },
      },
      price_type: {
        select: {
          to_irr: true,
        },
      },
    },
  });
  const added = await prisma.setting.findFirst({
    select: {
      add_price_market: true,
    },
  });

  return {
    top: top.map((e) => ({ ...e, tags: e.tags.map((el) => el.name) })),
    game: game.map((e) => ({ ...e, tags: e.tags.map((el) => el.name) })),
    inapp: inapp,
    market: market.map((e) => ({
      ...e,
      amount:
        e.amount * e.price_type.to_irr + (added ? added.add_price_market : 0),
    })),
  };
}

export async function getSearchGames(
  key: string,
  offer: boolean,
  tags: string,
  order: null | "high" | "low",
  page: number
) {
  let offerS = {};
  if (offer) {
    offerS = {
      NOT: {
        discount: 0,
      },
    };
  }

  let tagsS = {};
  if (tags.length !== 0) {
    const tagArr = tags.split("-");
    tagsS = {
      tags: {
        some: {
          name: {
            in: tagArr,
          },
        },
      },
    };
  }

  let orderBy = {};
  if (order) {
    if (order === "high") {
      orderBy = {
        price: "desc",
      };
    } else if (order === "low") {
      orderBy = {
        price: "asc",
      };
    }
  }

  const games = await prisma.games.findMany({
    where: {
      title: {
        contains: key,
      },
      ...tagsS,
      ...offerS,
    },
    select: {
      title: true,
      logo: true,
      discount: true,
      image_one: true,
      tags: {
        select: {
          name: true,
        },
      },
      prices: {
        where: {
          price_type: {
            currency: "USD",
          },
        },
        select: {
          id: true,
          pt_id: true,
          amount: true,
          price_type: true,
        },
        take: 1,
      },
    },
    orderBy: orderBy,
    skip: (page - 1) * 10,
    take: 10,
  });

  return games.map((e) => ({ ...e, tags: e.tags.map((el) => el.name) }));
}

export async function getGameByTitle(title: string): Promise<
  | {
      status: 404;
    }
  | {
      status: 200;
      data: {
        id: number;
        title: string;
        app_id: number;
        logo: string;
        description: string;
        discount: number;
        pc_minimum: string;
        pc_recommended: string;
        metacritic_score: number;
        metacritic_url: string;
        help: string;
        help_title: string;
        bg: string;
        purch: number;
        image_one: string;
        image_two: string;
        image_three: string;
        isTop: number;
        link: string;
        about_game: string;
        game_tips: {
          id: number;
          title: string;
          body: string;
        }[];
        tags: {
          name: string;
        }[];
        prices: {
          id: number;
          amount: number;
          price_type: {
            name: string;
            image: string;
            to_irr: number;
          };
        }[];
        games_dlc: {
          id: number;
          prices: {
            id: number;
            amount: number;
            price_type: {
              name: string;
              image: string;
              to_irr: number;
            };
          }[];
          name: string;
          image: string;
          discount: number;
        }[];
      };
    }
> {
  const game = await prisma.games.findUnique({
    where: {
      title: title,
    },
    include: {
      tags: {
        select: {
          name: true,
        },
      },
      prices: {
        select: {
          id: true,
          amount: true,
          price_type: {
            select: {
              name: true,
              image: true,
              to_irr: true,
            },
          },
        },
      },
      games_dlc: {
        select: {
          id: true,
          name: true,
          image: true,
          discount: true,
          prices: {
            select: {
              id: true,
              amount: true,
              price_type: {
                select: {
                  name: true,
                  image: true,
                  to_irr: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (game) {
    const tips = await prisma.game_tips.findMany({});
    return { status: 200, data: { ...game, game_tips: tips } };
  } else {
    return { status: 404 };
  }
}

export async function getSearchGamesShort(title: string): Promise<{
  status: 200;
  data: {
    title: string;
    logo: string;
    app_id: number;
  }[];
}> {
  const data = await prisma.games.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    select: {
      title: true,
      logo: true,
      app_id: true,
    },
    take: 4,
  });

  return { status: 200, data: data };
}
