"use server"

import { setup } from "@comp-action/setup"

export default async function Page(){

    await setup();

    return "created"
}