"use client";

import { getCartInfo, setCartCancel } from "@/components/action/setCart";
import { CookGet } from "@/components/global/cookie";
import priceFormat from "@/components/global/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconX, IconCreditCardPay } from "@tabler/icons-react";
import { AppContext } from "@/app/context/MyContext";

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
type Data = DGame | DDlc | DInapp | DMarket;
export default function Page() {
  const { t } = useTranslation();
  const { reloadCart } = useContext(AppContext);

  const [data, setData] = useState<Data[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  async function fetch() {
    reloadCart();
    const res = await getCartInfo(CookGet("jwt"));
    if (res.status === 200 && res.data) {
      setData(res.data);
      let t = 0;
      res.data.map((e) => (t += e.amount));
      setTotal(t);
    } else {
      window.location.replace("/");
    }
  }

  const removeHandler = async (id: number) => {
    const res = await setCartCancel(CookGet("jwt"), id);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return data !== null ? (
    <>
      <div className="">
        <div className="flex-inset">
          <div className="me-auto">
            <button className="btn btn-active">
              <IconCreditCardPay />
              <div className="ms-2">{t("payment")}</div>
            </button>
          </div>
          <div className="flex">
            <div className="flex mx-1">
              <div className="mx-1"> {t("Toman")}</div>
              {priceFormat(total)}
            </div>
            {"  :  "}
            {t("Total")}
          </div>
        </div>

        <div className="border-2 border-white border-opacity-10 w-8/12 mx-auto my-4"></div>

        {data.length === 0 ? (
          <>
            <div className="my-3 flex-inset">
              {t("You have not registered any purchases")}
            </div>
          </>
        ) : (
          data.map((e, i) => {
            return (
              <div
                className="my-1 p-3 rounded-lg bg-sky-900 bg-opacity-5 backdrop-blur-sm"
                key={`lwl-${i}`}
              >
                <div className="row">
                  <div className="uppercase">{t(e.type)}</div>
                  <div className="h-6 mx-3 rounded-lg border-2 border-white border-opacity-10 w-1"></div>
                  {e.type === "game" && (
                    <div className="flex-inset">
                      <Image
                        src={e.game.logo}
                        alt=""
                        width="600"
                        height="400"
                        className="w-24 rounded-lg me-2"
                      />
                      <Link
                        href={`/games/product/${e.game.title}`}
                        className=""
                      >
                        {e.game.title}
                      </Link>
                    </div>
                  )}
                  {e.type === "dlc" && (
                    <div className="flex-inset">
                      <Image
                        src={e.dlc.image}
                        alt=""
                        width="600"
                        height="400"
                        className="w-24 rounded-lg me-2"
                      />
                      <div className="flex">
                        {e.dlc.title}
                        <div className="mx-1">{t("DLC game")}</div>
                        {e.dlc.game.title}
                      </div>
                    </div>
                  )}
                  {e.type === "inapp" && (
                    <div className="flex-inset">
                      <Image
                        src={e.inapp.logo}
                        alt=""
                        width="600"
                        height="400"
                        className="w-10 rounded-lg"
                      />
                      <Image
                        src={e.inapp.item_logo}
                        alt=""
                        width="600"
                        height="400"
                        className="w-10 rounded-lg mx-1"
                      />
                      <div className="">{e.inapp.title}</div>
                    </div>
                  )}
                  {e.type === "market" && (
                    <div className="flex-inset">
                      <Image
                        src={e.market.logo}
                        alt=""
                        width="600"
                        height="400"
                        className="w-10 rounded-lg"
                      />
                      <div className="">{e.market.title}</div>
                    </div>
                  )}

                  <div className="ms-auto flex">
                    {priceFormat(e.amount)}
                    <div className="mx-1">{t("Toman")}</div>
                  </div>
                  <button
                    className="ms-4 btn btn-ghost"
                    onClick={() => removeHandler(e.id)}
                  >
                    <IconX />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  ) : (
    <></>
  );
}
