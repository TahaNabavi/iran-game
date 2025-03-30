"use server";

import prisma from "@prisma";

export async function getMainMetaData() {
  let data = await prisma.setting.findFirst({
    select: {
      website_name: true,
      title: true,
      title_tempalte: true,
      description: true,
      keywords: true,
      logo: true,
      banner: true,
    },
  });
  if (data)
    return {
      ...data,
      keywords: data.keywords.split(","),
    };
  else
    return {
      website_name: "",
      title: "",
      title_tempalte: "",
      description: "",
      keywords: [],
      logo: "/",
      banner: "/",
    };
}
