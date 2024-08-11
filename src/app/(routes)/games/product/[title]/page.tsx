"use client";

import DlcCard, { FakeDlcCard } from "@/components/ui/DlcCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DLCBuy from "@/components/modals/dlcBuy";
import auth from "@/components/global/auth";
import { getGameByTitle } from "@/components/action/getGames";
import { setNewCart } from "@/components/action/setCart";
import { CookGet } from "@/components/global/cookie";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/utils/cn";
import priceFormat from "@/components/global/priceFormat";
import Buygame from "@/components/modals/Buygame";
import { toast } from "react-toastify";

type GameDlcData = {
  id: number;
  prices: {
    id: number;
    amount: number;
    price_type: {
      name: string;
      image: string;
      to_irr: number;
    };
  }[];
  name: string;
  image: string;
  discount: number;
};
type Price = {
  id: number;
  amount: number;
  price_type: {
    name: string;
    image: string;
    to_irr: number;
  };
};
type GameTips = {
  id: number;
  title: string;
  body: string;
}[];
type Data = {
  id: number;
  title: string;
  app_id: number;
  logo: string;
  description: string;
  discount: number;
  pc_minimum: string;
  pc_recommended: string;
  metacritic_score: number;
  metacritic_url: string;
  help: string;
  help_title: string;
  bg: string;
  purch: number;
  image_one: string;
  image_two: string;
  image_three: string;
  isTop: number;
  link: string;
  game_tips: GameTips;
  about_game: string;
  tags: {
    name: string;
  }[];
  prices: Price[];
  games_dlc: GameDlcData[];
};

function Buymodal({
  priceData,
  gameId,
  gameName,
  discount,
}: {
  priceData: Price[];
  gameId: number;
  gameName: string;
  discount: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const def = {
    id: 0,
    amount: 0,
    price_type: {
      name: "",
      image: "",
      to_irr: 0,
    },
  };
  const [data, setData] = useState<Price>(def);

  const openHandler = () => {
    const modal = document.getElementById(
      "game-buy-modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };
  const closeHandler = useCallback(() => {
    router.replace("?");
    setData(def);
  }, []);

  const onFinish = useCallback(
    (
      username: string,
      password: string,
      backup_code: string,
      price_id: number,
      callback: (success: boolean) => void
    ) => {
      setNewCart(CookGet("jwt"), {
        type: "game",
        username,
        password,
        backup_code,
        game_id: gameId,
        price_id,
      })
        .then((response) => {
          callback(response.status === 200);
        })
        .catch((error) => {
          console.error(error);
          callback(false);
        });
    },
    [gameId]
  );

  useEffect(() => {
    if (searchParams.get("buy-id")) {
      const priceId = searchParams.get("buy-id");
      setData(priceData.filter((g) => g.id === Number(priceId))[0]);
      auth().then((res) => res && openHandler());
    }
  }, [searchParams]);

  return (
    <Buygame
      data={{ ...data, game_name: gameName, discount: discount }}
      onFinish={onFinish}
      onClose={closeHandler}
    />
  );
}
function DLCmodal({ dlcData }: { dlcData: GameDlcData[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<GameDlcData | null>(null);

  const openHandler = () => {
    const modal = document.getElementById("dlc-buy-modal") as HTMLDialogElement;
    modal?.showModal();
  };
  const closeHandler = useCallback(() => {
    router.replace("?");
    setData(null);
  }, []);

  const onFinish = useCallback(
    (
      username: string,
      password: string,
      backup_code: string,
      dlc_id: number,
      price_id: number,
      callback: (success: boolean) => void
    ) => {
      setNewCart(CookGet("jwt"), {
        type: "dlc",
        username,
        password,
        backup_code,
        dlc_id,
        price_id,
      })
        .then((response) => {
          callback(response.status === 200);
        })
        .catch((error) => {
          console.error(error);
          callback(false);
        });
    },
    []
  );

  useEffect(() => {
    if (searchParams.get("dlc-id")) {
      const dlcId = searchParams.get("dlc-id");
      setData(dlcData.filter((g) => g.id === Number(dlcId))[0]);
      auth().then((res) => res && openHandler());
    }
  }, [searchParams]);

  return <DLCBuy data={data} onFinish={onFinish} onClose={closeHandler} />;
}

function Images({ images }: { images: [string, string, string] }) {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const allImg = document.querySelectorAll(".shImg");
      allImg.forEach((e) => e.classList.add("opacity-0"));

      setCurrentImage((p) => {
        const img = document.querySelector(`#img-${p}`);
        img?.classList.remove("opacity-0");
        if (p === 3) {
          return 1;
        } else {
          return p + 1;
        }
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Image
        src={images[0]}
        alt=""
        width="3840"
        height="2000"
        className="shImg transition rounded-xl h-full w-96 "
        id="img-1"
      />
      <Image
        src={images[1]}
        alt=""
        width="3840"
        height="2000"
        className="shImg transition rounded-xl h-full w-96 absolute z-10"
        id="img-2"
      />
      <Image
        src={images[2]}
        alt=""
        width="3840"
        height="2000"
        className="shImg transition rounded-xl h-full w-96 absolute z-10"
        id="img-3"
      />
    </>
  );
}

function Help({
  game,
  tips,
}: {
  game?: { help: string; help_title: string };
  tips: GameTips;
}) {
  return (
    <>
      {game && (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="tips-f"
          >
            {game.help_title}
          </AccordionSummary>
          <AccordionDetails>{game.help}</AccordionDetails>
        </Accordion>
      )}
      {tips.map((e, i) => (
        <Accordion
          defaultExpanded={!game && i === 1 ? true : undefined}
          key={`tips-${i}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id={`tips-${i}`}
          >
            {e.title}
          </AccordionSummary>
          <AccordionDetails>{e.body}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

function Loader() {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full lg:h- bg-base-100 lg:flex mt-8 rounded-2xl p-4 mb-5">
        <div className="lg-col-10">
          <div className="row w-full">
            <div className="flex col-auto">
              <div
                className="skeleton w-12 h-12 rounded-lg relative -top-5"
                style={{ "--fallback-b3": "#272f38" } as CSSProperties}
              ></div>
              <div className="skeleton h-4 w-20 ms-2"></div>
            </div>
          </div>
          <div className="row">
            <div className="skeleton h-4 w-36 m-1"></div>
            <div className="skeleton h-4 w-24 m-1"></div>
            <div className="skeleton h-4 w-12 m-1"></div>
            <div className="skeleton h-4 w-20 m-1"></div>
            <div className="skeleton h-4 w-32 m-1"></div>
            <div className="skeleton h-4 w-40 m-1"></div>
          </div>
        </div>
        <div className="top-10 lg:-top-10 relative col-12 flex-inset lg-col-4">
          <div
            className="skeleton shImg transition rounded-xl h-full w-96"
            style={{ "--fallback-b3": "#272f38" } as CSSProperties}
          ></div>
        </div>
      </div>

      <div className="w-full row my-8 justify-content-center">
        <div className="col-12 flex-inset">
          <div className="w-52">
            <div className="divider">{t("DLCs")}</div>
          </div>
        </div>
        <FakeDlcCard />
        <FakeDlcCard />
        <FakeDlcCard />
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default function page({ params }: { params: { title: string } }) {
  const { t } = useTranslation();
  const router = useRouter();

  const [data, setData] = useState<Data | null>(null);

  const tagHandler = (term: string) => {
    router.push(`/games/search?tags=${term}`);
  };
  const dlcHandler = (id: number) => {
    router.replace(`?`);
    setTimeout(() => {
      router.replace(`?dlc-id=${id}`);
    }, 200);
  };
  const buyHandler = (id: number) => {
    router.replace(`?`);
    setTimeout(() => {
      router.replace(`?buy-id=${id}`);
    }, 200);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getGameByTitle(decodeURI(params.title));
      if (response.status === 404) {
        toast.warn(t("The desired game was not found"));
        router.push("/games/search");
      } else {
        setData(response.data);
      }
    }
    fetchData();
  }, [params.title]);

  return data === null ? (
    <Loader />
  ) : (
    <>
      <DLCmodal dlcData={data.games_dlc} />
      <Buymodal
        priceData={data.prices}
        gameId={data.id}
        gameName={data.title}
        discount={data.discount}
      />
      <div className="w-full lg:h- bg-base-100 lg:flex mt-8 rounded-2xl p-4 mb-5">
        <div className="lg-col-10 relative">
          <div className="row w-full">
            <div className="flex col-auto">
              <Image
                src={data.logo}
                alt=""
                width="500"
                height="500"
                className="w-[120px] h-[70px] rounded-lg relative -top-5"
              />
              <div className="flex ms-2">
                <Tooltip
                  title={<span className="text-md uppercase">metacritic</span>}
                  placement="top"
                >
                  <Link
                    className="p-1 rounded-lg bg-sky-950 border-2 border-white border-opacity-20 h-7 w-7 flex-inset"
                    rel="noreferrer"
                    target="_blank"
                    href={data.metacritic_url}
                  >
                    {data.metacritic_score}
                  </Link>
                </Tooltip>
                <Link
                  href={`https://store.steampowered.com/app/${data.app_id}`}
                  rel="noreferrer"
                  target="_blank"
                  className="text-lg ms-2 first-letter:uppercase"
                >
                  {data.title}
                </Link>
              </div>
            </div>
            <div className="row col-auto mx-5 mb-2 justify-content-center">
              {data.tags.map((e, i) => (
                <button
                  key={`ts-g-${i}`}
                  onClick={() => tagHandler(e.name)}
                  className="h-6 m-1 col-auto hover:tracking-widest transition-all px-3 text-white rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-sm lowercase font-bold tracking-wider"
                  style={{ fontVariant: "small-caps" } as CSSProperties}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
        <div className="top-10 lg:-top-10 relative col-12 flex-inset lg-col-4 h-52">
          <Images images={[data.image_one, data.image_two, data.image_three]} />
        </div>
      </div>

      <div className="row w-full">
        <div className="p-2 col-12 col-md-6 col-lg-6 flex-inset flex-col">
          <div className="divider w-9/12 mx-auto">{t("Order")}</div>
          {data.prices.map((e, i) => (
            <button
              onClick={() => buyHandler(e.id)}
              className="w-10/12 bg-gradient-to-br mt-5 px-2 flex-inset relative group/btn from-black dark:from-zinc-800 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              {data.discount === 0 ? (
                priceFormat(e.amount * e.price_type.to_irr)
              ) : (
                <>
                  <span className="takhfif mx-2">
                    {priceFormat(e.amount * e.price_type.to_irr)}
                  </span>
                  {priceFormat(
                    e.amount * e.price_type.to_irr -
                      ((e.amount * e.price_type.to_irr) / 100) * data.discount
                  )}
                </>
              )}
              <span className="ms-1">{t("Toman")}</span>
              <div className="ms-auto">
                {e.price_type.image.length !== 0 ? (
                  <Image
                    src={e.price_type.image}
                    alt=""
                    width="1000"
                    height="600"
                    className="h-6 w-8 rounded-sm"
                  />
                ) : (
                  e.price_type.name
                )}
              </div>
              <BottomGradient />
            </button>
          ))}
        </div>
        <div className="p-2 col-12 col-md-6 col-lg-6">
          <Help
            game={
              data.help && data.help_title
                ? {
                    help: data.help,
                    help_title: data.help_title,
                  }
                : undefined
            }
            tips={data.game_tips}
          />
        </div>
      </div>

      {data.games_dlc.length !== 0 && (
        <div className="w-full row my-8 justify-content-center">
          <div className="col-12 flex-inset">
            <div className="w-52">
              <div className="divider">{t("DLCs")}</div>
            </div>
          </div>
          {data.games_dlc.map((e, i) => (
            <DlcCard
              data={e}
              key={`dl-g-${i}`}
              callback={() => dlcHandler(e.id)}
            />
          ))}
        </div>
      )}

      <div className="row w-full">
        <div className="col-12 col-lg-6 p-2">
          <div className="bg-darkPattern border-2 h-full border-white border-opacity-10 rounded-lg p-2 relative overflow-hidden">
            <GridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
              )}
            />
            <div dangerouslySetInnerHTML={{ __html: data.pc_minimum }} />
          </div>
        </div>
        <div className="col-12 col-lg-6 p-2">
          <div className="bg-darkPattern border-2 h-full border-white border-opacity-10 rounded-lg p-2 relative overflow-hidden">
            <GridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
              )}
            />
            <div dangerouslySetInnerHTML={{ __html: data.pc_recommended }} />
          </div>
        </div>
      </div>

      {data.about_game && (
        <div className="w-full mt-5">
          <span className="text-3xl left-shadow ms-4 animated-text-shadow">
            <span className="sh-item">{t("About the game")}</span>
          </span>
          <div
            className="p-3"
            dangerouslySetInnerHTML={{
              __html: data.about_game.replaceAll(/\\/g, ""),
            }}
          />
        </div>
      )}
    </>
  );
}
