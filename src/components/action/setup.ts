"use server";

import prisma from "@prisma";

export async function setup() {
    await prisma.$transaction([
        prisma.cart.deleteMany(),
        prisma.inapp_prices.deleteMany(),
        prisma.inapp_item.deleteMany(),
        prisma.inapp.deleteMany(),
        prisma.games_dlc.deleteMany(),
        prisma.item_prices.deleteMany(),
        prisma.market.deleteMany(),
        prisma.games.deleteMany(),
        prisma.game_tips.deleteMany(),
        prisma.dlc_tips.deleteMany(),
        prisma.market_help.deleteMany(),
        prisma.price_types.deleteMany(),
        prisma.game_tags.deleteMany(),
        prisma.users.deleteMany(),
        prisma.setting.deleteMany(),
      ])
      
  await prisma.setting.create({
    data: {
      id: 1,
      website_name: "IranGame Store",
      title: "Premium Game Store",
      title_tempalte: "{page} | IranGame",
      description: "Buy games, DLCs and in-app items at best prices",
      keywords: "games,steam,dlc,gaming",
      logo: "/logo.png",
      banner: "/banner.jpg",
      add_price_market: 0.5,
    },
  });

  // Create price type
  await prisma.price_types.create({
    data: {
      id: 1,
      name: "Main Region - Dollar",
      currency: "USD",
      currency_code: 1,
      country_code: "US",
      image: "",
      to_irr: 63000,
      added_price_inapp: 20000,
      added_price_games: 20000,
    },
  });

  // Create item price
  await prisma.item_prices.create({
    data: {
      id: 1,
      pt_id: 1,
      amount: 20,
    },
  });

  // Create game tags
  await prisma.game_tags.createMany({
    data: [
      { id: 1, name: "Action" },
      { id: 2, name: "RPG" },
      { id: 3, name: "Adventure" },
      { id: 4, name: "FPS" },
      { id: 5, name: "Strategy" },
    ],
  });

  // Create help content
  await prisma.market_help.create({
    data: {
      id: 1,
      body: `Market purchase guidelines and tips...`,
    },
  });

  await prisma.game_tips.createMany({
    data: [
      { id: 1, title: "Before Purchase", body: "Check these before buying..." },
      { id: 2, title: "After Purchase", body: "What to do after buying..." },
    ],
  });

  await prisma.dlc_tips.create({
    data: {
      id: 1,
      text: "DLC purchasing advice...",
    },
  });

  // Create games
  const eldenRing = await prisma.games.create({
    data: {
      app_id: 1245620,
      title: "ELDEN RING",
      logo: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_184x69.jpg",
      description:
        "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace...",
      pc_minimum: "Requires a 64-bit processor and operating system...",
      pc_recommended: "Requires a 64-bit processor and operating system...",
      metacritic_score: 94,
      metacritic_url: "https://www.metacritic.com/game/pc/elden-ring",
      help: "",
      help_title: "",
      bg: "",
      discount: 10,
      purch: 0,
      image_one:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg",
      image_two:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg",
      image_three:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg",
      isTop: 1,
      link: "",
      about_game: "ELDEN RING Shadow of the Erdtree Edition includes...",
      tags: {
        connect: [{ id: 1 }, { id: 2 }], // Action, RPG
      },
      prices: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.games_dlc.create({
    data: {
      name: "Shadow of the Erdtree",
      image:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/header.jpg",
      discount: 0,
      prices: {
        connect: { id: 1 },
      },
      game: {
        connect: { id: eldenRing.id },
      },
    },
  });

  // Create in-app items
  await prisma.inapp.create({
    data: {
      title: "Discord Premium",
      logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
      bg: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a315f45888ab5517509314_Group%20127573.png",
      pin: true,
      buy_help_title: "Discord Account Requirements",
      buy_help_body: "Please ensure your Discord account meets these requirements before purchase...",
      buy_username: true,
      buy_password: true,
      buy_backup_code: true,
      inapp_item: {
        create: [
          {
            title: "Nitro Basic",
            logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/64d5e6a7a2df5d3e9a4d0d5e_Discord-Nitro-Basic-Icon.png",
            inapp_prices: {
              create: [
                { title: "1 Month", amount: 2.99, pt_id: 1 },
                { title: "1 Year", amount: 29.99, pt_id: 1 }
              ]
            }
          },
          {
            title: "Nitro Full",
            logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/64d5e6a7a2df5d3e9a4d0d5e_Discord-Nitro-Icon.png",
            inapp_prices: {
              create: [
                { title: "1 Month", amount: 9.99, pt_id: 1 },
                { title: "1 Year", amount: 99.99, pt_id: 1 }
              ]
            }
          }
        ]
      }
    }
  })


  // Create market items
  await prisma.market.create({
    data: {
      title: "Mann Co. Supply Crate Key",
      logo: "https://example.com/key.jpg",
      app_id: 440,
      amount: 2.19,
      pt_id: 1,
    },
  });
}
