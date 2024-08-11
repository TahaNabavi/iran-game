"use client";

import { getMarketItem } from "@/components/action/getMarket";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { IconLink } from "@tabler/icons-react";
import priceFormat from "@/components/global/priceFormat";
import { setNewCart } from "@/components/action/setCart";
import { CookGet } from "@/components/global/cookie";

function Loader() {
  return (
    <>
      <div
        className="w-full flex-inset"
        style={{ "--fallback-b3": "#191b20" } as CSSProperties}
      >
        <div className="container flex-inset row">
          <div className="relative w-72 h-72">
            <div className="skeleton w-72 h-72 rounded-lg shadow-xl border-2 border-white border-opacity-10" />
            <div className="absolute top-0 left-0">
              <div className="skeleton h-10 w-20 rounded-md" />
            </div>
          </div>
          <div className="mx-auto">
            <div className="flex-inset mt-3">
              <div className="text-2xl ms-4 skeleton h-4 w-24" />
              <div className="text-2xl ms-4 skeleton h-4 w-24" />
              <div className="ms-6 p-2 border-2 border-white border-opacity-10 bg-slate-700 rounded-lg">
                <div className="skeleton h-4 w-20"></div>
              </div>
            </div>

            <div className="mt-3 flex-inset flex-col">
              <div className="my-2 row">
                <div className="skeleton m-1 w-32 h-4"></div>
                <div className="skeleton m-1 w-16 h-4"></div>
                <div className="skeleton m-1 w-32 h-4"></div>
                <div className="skeleton m-1 w-20 h-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type Data = {
  id: number;
  title: string;
  logo: string;
  amount: number;
  app_id: number;
  market_help: string;
};

export default function Page({
  params,
}: {
  params: { title: string; app_id: string };
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);

  const tradelink = useRef<HTMLInputElement>(null);
  
  const buyHandler = () => {
    const link = tradelink.current;

    async function send() {
      if (link && data) {
        setLoading(true);
        const res = await setNewCart(CookGet("jwt"), {
          type: "market",
          trade_link: link.value,
          market_id: data.id,
        });
        if (res.status === 200) {
          link.value = "";
          toast.success(t("Added to your shopping cart"));
        } else {
          toast.error(t("E.rr"));
        }
      } else {
        toast.error(t("E.ns"));
      }
    }

    if (link) {
      if (link.value.length === 0) {
        toast.warn(t("Please enter a trade link"));
      } else if (
        !/^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9-_]+$/.test(
          link.value
        )
      ) {
        toast.warn(t("Please enter a valid trade link"));
      } else {
        send();
      }
    }
  };

  useEffect(() => {
    async function fetch() {
      const res = await getMarketItem(decodeURI(params.title), parseInt(params.app_id));
      if (res.status === 404) {
        toast.warn(t("The desired product was not found"));
        router.push("/market/search"); 
      } else {
        setData(res.data);
      }
    }
    fetch();
  }, []);

  return data === null ? (
    <Loader />
  ) : (
    <>
      <div className="w-full flex-inset">
        <div className="container flex-inset row">
          <div className="relative w-72 h-72">
            <Image
              src={data.logo}
              alt={data.title}
              width="1000"
              height="1000"
              className="w-72 h-72 rounded-lg shadow-xl border-2 border-white border-opacity-10"
            />
          </div>
          <div className="mx-auto">
            <div className="flex-inset mt-3">
              <Link
                href={`https://steamcommunity.com/market/listings/${data.app_id}/${data.title}`}
                rel="noreferrer"
                target="_blank"
                className="text-2xl ms-4"
              >
                {data.title}
              </Link>
              <div className="ms-6 p-2 border-2 border-white border-opacity-10 bg-slate-700 rounded-lg">
                {priceFormat(data.amount)}
                <span className="ms-1">{t("Toman")}</span>
              </div>
            </div>

            <div className="mt-3 flex-inset flex-col">
              <div className="my-2">
                <div
                  dangerouslySetInnerHTML={{ __html: data.market_help }}
                ></div>
              </div>
              <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                <IconLink />
                <input
                  type="text"
                  className="grow"
                  placeholder={t("your trade link")}
                  ref={tradelink}
                />
              </label>
              <button
                className={`btn btn-active mt-2 ${loading && "ops"}`}
                onClick={buyHandler}
              >
                {t("Add to cart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
