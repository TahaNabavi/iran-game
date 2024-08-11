"use client";

import LetterPullup from "@/components/ui/letterpullup";
import { useCallback, useEffect, useState } from "react";
import { getInapp } from "@/components/action/getInapp";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { setNewCart } from "@/components/action/setCart";
import { CookGet } from "@/components/global/cookie";
import auth from "@/components/global/auth";
import BuyInapp from "@/components/modals/BuyInapp";

type Inapp_item = {
  id: number;
  title: string;
  logo: string;
  inapp_prices: {
    id: number;
    title: string;
    amount: number;
    price_type: {
      to_irr: number;
    };
  }[];
};
type Data = {
  id: number;
  title: string;
  logo: string;
  bg: string;
  buy_help_title: string;
  buy_help_body: string;
  buy_username: boolean;
  buy_password: boolean;
  buy_id: boolean;
  buy_name: boolean;
  buy_email: boolean;
  buy_backup_code: boolean;
  inapp_item: Inapp_item[];
};

function Itemmodal({ inData }: { inData: Data }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<Inapp_item | null>(null);

  const openHandler = () => {
    const modal = document.getElementById(
      "inapp-buy-modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };
  const closeHandler = useCallback(() => {
    router.replace("?");
    setData(null);
  }, []);

  const onFinish = useCallback(
    (
      username: string | null,
      password: string | null,
      acc_id: string | null,
      acc_name: string | null,
      email: string | null,
      backup_code:string | null,
      inapp_prices_id: number,
      callback: (success: boolean) => void
    ) => {
      setNewCart(CookGet("jwt"), {
        type: "inapp",
        username,
        password,
        acc_id,
        acc_name,
        email,
        inapp_prices_id,
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
    if (searchParams.get("item-id")) {
      const itemId = searchParams.get("item-id");
      setData(inData.inapp_item.filter((g) => g.id === Number(itemId))[0]);
      auth().then((res) => res && openHandler());
    }
  }, [searchParams]);

  return (
    <BuyInapp
      data={{ ...inData, inapp_item: data }}
      onFinish={onFinish}
      onClose={closeHandler}
    />
  );
}

function Loader() {
  return (
    <>
      <div className="w-full flex-inset">
        <div className="container relative">
          <div className="skeleton h-96 w-full"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30  flex-inset rounded-xl">
            <div className="flex-inset flex-col p-2 px-6 rounded-lg backdrop-blur-lg bg-dark bg-opacity-40 border-4 border-opacity-20 border-black shadow-lg">
              <div className="skeleton h-28 w-28"></div>
              <span className="ms-1 text-2xl mt-1 text-white">
                <div className="skeleton h-4 w-28"></div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-3 row flex-inset">
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
        <button className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group mx-1 flex-inset flex-col">
          <div className="skeleton h-[130px] w-[130px]"></div>
          <div className="skeleton h-4 w-28 mt-2"></div>
        </button>
      </div>
    </>
  );
}

export default function page({ params }: { params: { title: string } }) {
  const router = useRouter();
  const { t } = useTranslation();

  const [data, setData] = useState<Data | null>(null);

  const clickHandler = (id: number) => {
    router.push(`?`);
    setTimeout(()=>{
      router.push(`?item-id=${id}`);
    },200)
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getInapp(decodeURI(params.title));
      if (res.status === 404) {
        toast.warn(t("The desired product was not found"));
        router.push("/games/search");
      } else {
        setData(res.data);
      }
    }
    fetchData();
  }, []);

  return !data ? (
    <Loader />
  ) : (
    <>
      <Itemmodal inData={data} />
      <div className="w-full flex-inset">
        <div className="container relative">
          <img src={data.bg} alt="" className="w-full rounded-xl max-h-96" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30  flex-inset rounded-xl">
            <div className="flex-inset flex-col p-2 px-6 rounded-lg backdrop-blur-lg bg-dark bg-opacity-40 border-4 border-opacity-20 border-black shadow-lg">
              <img className="w-28 h-28 rounded-md" src={data.logo} alt="" />
              <span className="ms-1 text-2xl mt-1 text-white">
                {/* <LetterPullup words={data.title} delay={0.05} /> */}
                {data.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-3 row flex-inset">
        {data.inapp_item.map((e, i) => (
          <button
            onClick={() => clickHandler(e.id)}
            className="bg-black bg-opacity-20 rounded-xl p-2 w-36 group m-1"
            key={`iam-it-${i}`}
          >
            <img className="w-full rounded-lg shadow-lg" src={e.logo} alt="" />
            <div className="mt-2 bg-slate-500 rounded-md bg-opacity-20 text-center w-full py-1 group-hover:tracking-wider first-letter:uppercase transition-all">
              {e.title}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
