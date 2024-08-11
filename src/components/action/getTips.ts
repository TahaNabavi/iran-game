"use server";

import prisma from "../global/prisma";

export async function getDlcTips() {
  const tips = await prisma.dlc_tips.findFirst({});

  return tips;
}
