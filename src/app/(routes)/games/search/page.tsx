"use client"

import getParameter from "@/components/global/getParameter";
import { PlaceholdersAndVanishInput } from "@/components/ui/search";
import { useSearchParams, useRouter } from "next/navigation";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from "react-i18next";
import { removeQueries, setQueries } from "@/components/global/query";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GameCard, { FakeGameCard } from "@/components/ui/gameCard";
import Image from "next/image";
import { getSearchGames } from "@/components/action/getGames";
import LoadMore from "@/components/ui/loadMore";

const { gameSearchPlaceHolders, gameTags } = require("conf")


function Drawer({ emptyFunc }: { emptyFunc: () => void }) {

  const { t } = useTranslation();
  const router = useRouter()

  return (
    <div className="drawer w-28">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex">
        <button className="btn btn-active" onClick={() => router.push("/games/search")}><RestartAltIcon /></button>
        <label htmlFor="my-drawer" className="btn btn-action drawer-button ms-2"><FilterAltIcon /></label>
      </div>
      <div className="drawer-side" style={{ zIndex: 999 } as CSSProperties}>
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="flex-inset mb-2">
            <FilterAltIcon />
            <span className="text-2xl">{t("Filter")}</span>
          </div>
          <div className="divider">{t("Sorter")}</div>
          <div className="flex-inset flex-col">
            <div className="join">
              <input className="join-item btn" type="radio" name="options" aria-label={t("All")} defaultChecked={getParameter("offer") === null ? true : false} onChange={() => {
                router.push(`/games/search?${removeQueries(["offer", "page"])}`)
              }} />
              <input className="join-item btn" type="radio" name="options" aria-label={t("Offers")} defaultChecked={getParameter("offer") === null ? false : true} onChange={() => {
                router.push(`/games/search?${setQueries([{ key: "offer", value: "true" }, { key: "page", value: "1" }])}`)
              }} />
            </div>
            <div className="join mt-1">
              <input className="join-item btn" type="radio" name="options1" aria-label={t("Highest price")} defaultChecked={getParameter("pur") === "high" ? true : false} onChange={() => {
                router.push(`/games/search?${setQueries([{ key: "pur", value: "high" }, { key: "page", value: "1" }])}`)
              }} />
              <input className="join-item btn" type="radio" name="options1" aria-label={t("Lowest price")} defaultChecked={getParameter("pur") === "low" ? true : false} onChange={() => {
                router.push(`/games/search?${setQueries([{ key: "pur", value: "low" }, { key: "page", value: "1" }])}`)
              }} />
            </div>
          </div>
          <div className="divider">{t("Game tags")}</div>
          <div className="row w-full justify-content-center">
            {gameTags.map((e: string, i: number) => {

              const getChecked = () => {
                const tags = getParameter("tags");
                let dc = false;
                if (tags !== null && typeof tags !== "object") {
                  if (tags.split("-").includes(e)) dc = true;
                }
                return dc
              }

              const changeHandler = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
                emptyFunc()
                const target = event.target as HTMLInputElement;
                const befTags = getParameter("tags");
                if (befTags && typeof befTags !== "object") {
                  const tagsArr = befTags.split("-");
                  if (tagsArr.includes(e)) {
                    target.checked = false;
                    const newTags = tagsArr.filter((el) => el !== e);
                    router.push(`/games/search?${setQueries([{ key: "tags", value: newTags.join("-") }, { key: "page", value: "1" }])}`)
                  } else {
                    target.checked = true;
                    router.push(`/games/search?${setQueries([{ key: "tags", value: befTags + "-" + e }, { key: "page", value: "1" }])}`)
                  }
                } else {
                  target.checked = true;
                  router.push(`/games/search?${setQueries([{ key: "tags", value: e }, { key: "page", value: "1" }])}`)
                }
              }, [])


              return (
                <input className="btn btn-neutral m-1" key={`g-as-g-${i}`} type="radio" aria-label={e} defaultChecked={getChecked()} onClick={changeHandler} />
              )
            })}
          </div>
        </ul>
      </div>
    </div>
  )
}

function Loader() {
  return (
    <>
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
    </>
  )
}

type Data = {
  title: string,
  discount: number,
  logo: string,
  image_one: string
  tags: string[],
  prices: {
    id: number;
    pt_id: number;
    amount: number;
    price_type: {
      id: number;
      name: string;
      currency: string;
      country_code: string;
      image: string;
      to_irr: number;
    };
  }[];
}

export default function page() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data[]>([])
  const [end, setEnd] = useState<boolean>(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    setData([]);
    router.push(`/games/search?${setQueries([{ key: "key", value: target.text.value }, { key: "page", value: "1" }])}`);
  };

  function loadMore() {
    const page = getParameter("page")
    if (page) {
      router.push(`/games/search?${setQueries([{ key: "page", value: (Number(page) + 1).toString() }])}`)
    } else {
      router.push(`/games/search?${setQueries([{ key: "page", value: "2" }])}`)
    }
  }
  const doEmpty = () => {
    setData([])
  }

  async function getData(key: string, offer: boolean, tags: string, order: "high" | "low" | null, page: number) {
    return await getSearchGames(key, offer, tags, order, page);
  }


  useEffect(() => {
    const key = getParameter("key")?.replaceAll("+", " ")
    const offer = getParameter("offer")
    const tags = getParameter("tags")
    const order = getParameter("pur")
    const page = getParameter("page")

    if (!page || (page && page === "1")) {
      setLoading(true)
    };
    
    if(!page){
      setEnd(false)
    }


    getData(
      key || "",
      offer !== null ? true : false,
      tags || "",
      order ? order === "low" || order === "high" ? order : null : null,
      page ? Number(page) : 1
    ).then((res) => {
      setLoading(false)
      if (res.length === 0) {
        setEnd(true)
      } else if (page && page !== "1") {
        setData(p => ([...p, ...res]));
      } else {
        setData(res);
      }
    });
  }, [searchParams])

  return <>
    <div className="absolute -z-0 bg-base-200 w-screen h-28 top-0 left-0"></div>
    <div className="my-5 flex-inset relativ">
      <PlaceholdersAndVanishInput
        placeholders={gameSearchPlaceHolders}
        onChange={() => { }}
        onSubmit={onSubmit}
      />
      <Drawer emptyFunc={doEmpty} />
    </div>
    <div className="row w-full justify-content-center mt-4 z-10">
      {loading ? <Loader /> :
        data.length === 0 ?
          <>
            <div className="flex-inset flex-col my-10 z-10">
              <Image src="/nores.webp" alt="" width="200" height="200" />
              <span>{t("No results found")}</span>
            </div>
          </> :
          data.map((e, i) => (
            <GameCard data={e} key={`gs-c-${i}`} />
          ))
      }
    </div>
    <div className="flex-inset w-full">
      {data.length !== 0 && !end ? <LoadMore onSeen={loadMore} text={null} /> : ""}
    </div>
  </>
}