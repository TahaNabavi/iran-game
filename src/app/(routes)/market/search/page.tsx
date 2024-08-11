"use client";

import getParameter from "@/components/global/getParameter";
import { PlaceholdersAndVanishInput } from "@/components/ui/search";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { setQueries } from "@/components/global/query";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Image from "next/image";
import LoadMore from "@/components/ui/loadMore";
import MarketCard, { FakeMarketCard } from "@/components/ui/marketCard";
import { IconDeviceGamepad, IconDeviceGamepad3 } from "@tabler/icons-react";
import { getSearchGamesShort } from "@/components/action/getGames";
import {
  getItemInMarket,
  getSearchMarket,
} from "@/components/action/getMarket";
import { IconBrandSteam, IconUnlink } from "@tabler/icons-react";
import { toast } from "react-toastify";

const { marketSearchPlaceHolders } = require("conf");

function Loader() {
  return (
    <>
      <FakeMarketCard />
      <FakeMarketCard />
      <FakeMarketCard />
      <FakeMarketCard />
      <FakeMarketCard />
      <FakeMarketCard />
    </>
  );
}

function Dialog() {
  const { t } = useTranslation();

  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    {
      logo: string;
      title: string;
      app_id: number;
    }[]
  >([]);

  const closeHandler = () => {
    const modal = document.getElementById("filter-modal") as HTMLDialogElement;
    modal?.close();
  };

  const handler = (app_id: number) => {
    router.push(
      `/market/search?${setQueries([
        { key: "app_id", value: app_id.toString() },
      ])}`
    );
    closeHandler();
  };

  const changeHandler = (val: string) => {
    setSearch(val);
    async function fetch() {
      setLoading(true);
      const res = await getSearchGamesShort(val);
      setData(res.data);
      setLoading(false);
    }
    fetch();
  };

  return (
    <dialog id="filter-modal" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeHandler}
        >
          ✕
        </button>

        <div className="flex-inset flex-col w-full">
          <label className="input input-bordered flex items-center gap-2 w-8/12 my-3">
            <IconDeviceGamepad3 />
            <input
              type="text"
              className="grow"
              placeholder={t("Search")}
              value={search}
              onChange={(e) => changeHandler(e.target.value)}
            />
          </label>

          {search.length === 0 ? (
            t("Please write the name of a game")
          ) : data.length === 0 ? (
            t("There is no such game")
          ) : (
            <div className="row w-full">
              {data.map((e, i) => (
                <div className="col-6">
                  <button
                    onClick={() => handler(e.app_id)}
                    className="w-full bg-black bg-opacity-10 rounded-lg p-2 flex-inset flex-col my-1"
                  >
                    <Image
                      src={e.logo}
                      alt={e.title}
                      width="400"
                      height="400"
                      className="w-full h-26"
                    />
                    <span className="text-lg mt-2">{e.title}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

type Data = {
  pin: boolean;
  title: string;
  logo: string;
  amount: number;
  app_id:number;
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const steamLink = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [end, setEnd] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    setData([]);
    router.push(
      `/market/search?${setQueries([
        { key: "key", value: target.text.value },
        {
          key: "page",
          value: "1",
        },
      ])}`
    );
  };

  function loadMore() {
    const page = getParameter("page");
    if (page) {
      router.push(
        `/market/search?${setQueries([
          { key: "page", value: (Number(page) + 1).toString() },
        ])}`
      );
    } else {
      router.push(
        `/market/search?${setQueries([{ key: "page", value: "2" }])}`
      );
    }
  }

  const openDialog = () => {
    const modal = document.getElementById("filter-modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const linkSearch = () => {
    async function send(url: string) {
      const res = await getItemInMarket(url);
      if (res.status === 11) {
        toast.error(t("E.ns"));
      } else {
        router.push(`/market/product/${res.data.app_id}/${res.data.title}`);
      }
    }
    const link = steamLink.current;
    if (link) {
      // if (
      //   !/^https:\/\/steamcommunity\.com\/market\/listings\/\d+\/[\w%]+$/.test(
      //     link.value
      //   )
      // ) {
      //   toast.warn("Please enter a valid link");
      // } else send(link.value);
      send(link.value);
    } else {
      toast.warn("Please enter a link");
    }
  };

  useEffect(() => {
    const key = getParameter("key")?.replaceAll("+", " ");
    const app_id = getParameter("app_id");
    const page = getParameter("page");

    if (!page || (page && page === "1")) {
      setLoading(true);
    }

    if (!page) {
      setEnd(false);
    }

    getSearchMarket(
      key || "",
      app_id ? Number(app_id) : null,
      page ? Number(page) : 1
    ).then((res) => {
      setLoading(false);
      if (res.length === 0) {
        setEnd(true);
      } else if (page && page !== "1") {
        setData((p) => [...p, ...res]);
      } else {
        setData(res);
      }
    });
  }, [searchParams]);

  return (
    <>
      <Dialog />
      <div className="absolute -z-0 bg-base-200 w-screen h-28 top-0 left-0"></div>
      <div className="my-5 flex-inset relative">
        <PlaceholdersAndVanishInput
          placeholders={marketSearchPlaceHolders}
          onChange={() => {}}
          onSubmit={onSubmit}
        />
        <button className="btn btn-active mx-1" onClick={openDialog}>
          <IconDeviceGamepad />
        </button>
        <button
          className="btn btn-active"
          onClick={() => router.push("/market/search")}
        >
          <RestartAltIcon />
        </button>
      </div>
      <div className="row w-full justify-content-center mt-4 z-10">
        <div className="col-12 flex-inset my-2">
          <div className="col-11 col-md-9 col-lg-7 flex">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <div className="">
                <IconBrandSteam />
              </div>
              <input
                type="text"
                className="grow"
                placeholder={t("steam market link")}
                ref={steamLink}
              />
            </label>
            <button
              className="btn btn-active btn-neutral ms-1"
              onClick={linkSearch}
            >
              <IconUnlink />
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : data.length === 0 ? (
          <>
            <div className="flex-inset flex-col my-10 z-10">
              <Image src="/nores.webp" alt="" width="200" height="200" />
              <span>{t("No results found")}</span>
            </div>
          </>
        ) : (
          data.map((e, i) => <MarketCard data={e} key={`iap-${i}`} />)
        )}
      </div>
      <div className="flex-inset w-full">
        {data.length !== 0 && !end ? (
          <LoadMore onSeen={loadMore} text={null} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
