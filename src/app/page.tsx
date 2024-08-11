"use client";

import MainSlider from "@/components/ui/mainSlider";
import { useTranslation } from "react-i18next";
import MoreGame from "@/components/ui/GameSec";
import { useEffect, useState } from "react";
import GameSection from "@/components/ui/GameSec";
import { PlaceholdersAndVanishInput } from "@/components/ui/search";
import { useRouter } from "next/navigation";
import { getMainGames } from "@/components/action/getGames";
import GameCard, { FakeGameCard } from "@/components/ui/gameCard";
import MarketCard from "@/components/ui/marketCard";
import InappCard from "@/components/ui/inappCard";

const { gameSearchPlaceHolders } = require("conf");

type Game = {
  title: string;
  discount: number;
  logo: string;
  image_one: string;
  tags: string[];
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
};
type SliderData = {
  title: string;
  description: string;
  discount: number;
  tags: string[];
  image_one: string;
  image_two: string;
  image_three: string;
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
};
type Inapp = {
  inapp_item: {
    logo: string;
  }[];
  id: number;
  title: string;
  logo: string;
};
type Market = {
  logo: string;
  title: string;
  amount: number;
  game: {
    app_id: number;
  };
  price_type: {
    to_irr: number;
  };
  id: number;
};
function Loader() {
  return (
    <div className="w-full row justify-content-center">
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
      <FakeGameCard />
    </div>
  );
}

export default function page() {
  const { t } = useTranslation();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    game: Game[];
    market: Market[];
    inapp: Inapp[];
    top: SliderData[];
  }>({
    top: [],
    game: [],
    inapp: [],
    market: [],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    router.push(`/games/search?key=${target.text.value}`);
  };

  async function getData() {
    const res = await getMainGames();
    setData(res);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="my-5 flex-inset">
        <PlaceholdersAndVanishInput
          placeholders={gameSearchPlaceHolders}
          onChange={() => {}}
          onSubmit={onSubmit}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.top.length !== 0 && <MainSlider insertData={data.top} />}

          {data.game.length !== 0 && (
            <div className="my-5">
              <span className="text-3xl left-shadow ms-4 animated-text-shadow my-2">
                <div className="sh-item">{t("Games")}</div>
              </span>
              <div className="flex-inset row">
                {data.game.map((e, i) => (
                  <GameCard data={e} key={`dawtl-${i}`} />
                ))}
                <div className="col-12 mt-4 z-20 flex-inset">
                  <button
                    className="btn btn-ghost px-10"
                    onClick={() => router.push("/games/search")}
                  >
                    {"<--- "}
                    {t("More")}
                    {" --->"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {data.inapp.length !== 0 && (
            <div className="my-5">
              <span className="text-3xl left-shadow ms-4 animated-text-shadow my-2">
                <div className="sh-item">{t("inapp")}</div>
              </span>
              <div className="flex-inset row">
                {data.inapp.map((e, i) => (
                  <InappCard data={e} key={`dhawl-${i}`} />
                ))}
                <div className="col-12 mt-4 z-20 flex-inset">
                  <button
                    className="btn btn-ghost px-10"
                    onClick={() => router.push("/inapp/search")}
                  >
                    {"<--- "}
                    {t("More")}
                    {" --->"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {data.market.length !== 0 && (
            <div className="my-5">
              <span className="text-3xl left-shadow ms-4 animated-text-shadow my-2">
                <div className="sh-item">{t("market")}</div>
              </span>
              <div className="flex-inset row">
                {data.market.map((e, i) => (
                  <MarketCard data={e} key={`dawl-${i}`} />
                ))}
                <div className="col-12 mt-4 z-20 flex-inset">
                  <button
                    className="btn btn-ghost px-10"
                    onClick={() => router.push("/market/search")}
                  >
                    {"<--- "}
                    {t("More")}
                    {" --->"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
    </>
  );
}
