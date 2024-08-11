"use client";

import getParameter from "@/components/global/getParameter";
import { PlaceholdersAndVanishInput } from "@/components/ui/search";
import { useSearchParams, useRouter } from "next/navigation";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTranslation } from "react-i18next";
import { setQueries } from "@/components/global/query";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Image from "next/image";
import LoadMore from "@/components/ui/loadMore";
import InappCard, { FakeInappCard } from "@/components/ui/inappCard";
import { getSearchInapp } from "@/components/action/getInapp";

const { inappSearchPlaceHolders } = require("conf");

function Loader() {
  return (
    <>
      <FakeInappCard />
      <FakeInappCard />
      <FakeInappCard />
      <FakeInappCard />
      <FakeInappCard />
      <FakeInappCard />
    </>
  );
}

type Data = {
  inapp_item: {
    logo: string;
  }[];
  pin: boolean;
  title: string;
  logo: string;
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [end, setEnd] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    setData([]);
    router.push(
      `/inapp/search?${setQueries([
        { key: "key", value: target.text.value },
        { key: "page", value: "1" },
      ])}`
    );
  };

  function loadMore() {
    const page = getParameter("page");
    if (page) {
      router.push(
        `/inapp/search?${setQueries([
          { key: "page", value: (Number(page) + 1).toString() },
        ])}`
      );
    } else {
      router.push(`/inapp/search?${setQueries([{ key: "page", value: "2" }])}`);
    }
  }

  useEffect(() => {
    const key = getParameter("key")?.replaceAll("+", " ");
    const page = getParameter("page");

    if (!page || (page && page === "1")) {
      setLoading(true);
    }

    if (!page) {
      setEnd(false);
    }

    getSearchInapp(key || "", page ? Number(page) : 1).then((res) => {
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
      <div className="absolute -z-0 bg-base-200 w-screen h-28 top-0 left-0"></div>
      <div className="my-5 flex-inset relative">
        <PlaceholdersAndVanishInput
          placeholders={inappSearchPlaceHolders}
          onChange={() => {}}
          onSubmit={onSubmit}
        />
        <button
          className="btn btn-active"
          onClick={() => router.push("/inapp/search")}
        >
          <RestartAltIcon />
        </button>
      </div>
      <div className="row w-full justify-content-center mt-4 z-10">
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
          data.map((e, i) => <InappCard data={e} key={`iap-${i}`} />)
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
