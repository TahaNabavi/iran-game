"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUserData } from "@/components/action/getUser";
import errorHandler from "@/components/global/errorHandler";
import { CookGet, CookRemove } from "@/components/global/cookie";
import auth from "@/components/global/auth";
import { Badge, Tooltip } from "@mui/material";
import copyToClipboard from "@/components/global/copy";
import {
  IconDeviceGamepad2,
  IconBuildingStore,
  IconPumpkinScary,
  IconLogin,
  IconHome,
  IconShoppingBag,
} from "@tabler/icons-react";
import { AppContext } from "./context/MyContext";

type Data = {
  username: string;
  avatar: string;
};

function Btns() {
  const { t } = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [where, setWhere] = useState<string>("");

  useEffect(() => {
    setWhere(pathname.split("/")[1]);
  }, [searchParams, pathname]);

  return (
    <>
      <button
        className={`flex-inset flex-col item mt-3 ${where === "" && "active"}`}
        onClick={() => router.push("/")}
      >
        <IconHome />
        <p className="lowercase">{t("Home")}</p>
      </button>
      <button
        className={`flex-inset flex-col item mt-3 ${
          where === "games" && "active"
        }`}
        onClick={() => router.push("/games/search")}
      >
        <IconDeviceGamepad2 />
        <p className="lowercase">{t("Games")}</p>
      </button>
      <button
        className={`flex-inset flex-col item mt-3 ${
          where === "inapp" && "active"
        }`}
        onClick={() => router.push("/inapp/search")}
      >
        <IconBuildingStore />
        <p className="lowercase">{t("In app")}</p>
      </button>
      <button
        className={`flex-inset flex-col item mt-3 ${
          where === "market" && "active"
        }`}
        onClick={() => router.push("/market/search")}
      >
        <IconPumpkinScary />
        <p className="lowercase">{t("Market")}</p>
      </button>
    </>
  );
}
function BtnsTwo({
  isLogin,
  loginHandler,
}: {
  isLogin: boolean | null;
  loginHandler: () => void;
}) {
  const { t } = useTranslation();

  const { reloadCart, state } = useContext(AppContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [where, setWhere] = useState<string>("");

  const [data, setData] = useState<Data>({
    username: "",
    avatar: "",
  });

  const logoutHandler = () => {
    CookRemove("jwt");
    window.location.reload();
  };

  useEffect(() => {
    setWhere(pathname.split("/")[1]);
  }, [searchParams, pathname]);

  useEffect(() => {
    getUserData(CookGet("jwt")).then((res) =>
      errorHandler(t, res.status, () => {
        res.data && setData(res.data);
        reloadCart();
      })
    );
  }, []);

  return (
    <>
      <button
        className={`flex-inset flex-col item mx-auto ${
          where === "" && "active"
        }`}
        onClick={() => router.push("/")}
      >
        <IconHome />
        <p className="lowercase">{t("Home")}</p>
      </button>
      <button
        className={`flex-inset flex-col item mx-auto ${
          where === "games" && "active"
        }`}
        onClick={() => router.push("/games/search")}
      >
        <IconDeviceGamepad2 />
        <p className="lowercase">{t("Games")}</p>
      </button>
      <button
        className={`flex-inset flex-col item mx-auto ${
          where === "inapp" && "active"
        }`}
        onClick={() => router.push("/inapp/search")}
      >
        <IconBuildingStore />
        <p className="lowercase">{t("In app")}</p>
      </button>
      <button
        className={`flex-inset flex-col item mx-auto ${
          where === "market" && "active"
        }`}
        onClick={() => router.push("/market/search")}
      >
        <IconPumpkinScary />
        <p className="lowercase">{t("Market")}</p>
      </button>

      {isLogin === null ? (
        <div className="avatar w-12 h-12 mx-auto">
          <div className="mask mask-squircle w-24">
            <div className="skeleton h-32 w-32"></div>
          </div>
        </div>
      ) : isLogin ? (
        <>
          <Link
            href="/dash/cart"
            className="btn btn-ghost h-10 w-10 mx-auto mb-2"
          >
            <Badge badgeContent={state.cart} color="primary">
              <IconShoppingBag />
            </Badge>
          </Link>

          <div className="dropdown dropdown-end dropdown-top">
            <div tabIndex={0} role="button">
              <div className="avatar w-12 h-12 me-2 mt-2">
                <div className="mask mask-squircle w-24">
                  <Image
                    src={data.avatar}
                    alt="iran game"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 ms-5 w-64 shadow"
            >
              <div className="card-body flex flex-row">
                <div className="w-52 p-1">
                  <div className="flex-inset w-full">
                    <div className="mask mask-hexagon w-7 h-7">
                      <Image
                        src={data.avatar}
                        alt="iran game"
                        className="w-7 h-7"
                        width={100}
                        height={100}
                      />
                    </div>
                    <Tooltip
                      title={
                        <span className="text-md">
                          {t("click to copy") + " | " + data.username}
                        </span>
                      }
                      placement="top"
                    >
                      <button
                        className="text-lg font-bold ms-2 text-hidden"
                        onClick={copyToClipboard}
                      >
                        {data.username}
                      </button>
                    </Tooltip>
                  </div>
                  <div className="row w-full mt-2">
                    <div className="col-12 p-1">
                      <button
                        onClick={logoutHandler}
                        className="btn btn-neutral btn-sm w-full"
                      >
                        <LogoutIcon />
                        {t("Logout")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="avatar w-12 h-12 mx-auto">
            <div className="mask mask-squircle w-24">
              <button
                onClick={loginHandler}
                className="btn btn-primary flex-inset w-full h-full"
              >
                <div className="">
                  <IconLogin />
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Prof() {
  const { t } = useTranslation();
  const { reloadCart, state } = useContext(AppContext);

  const [data, setData] = useState<Data>({
    username: "",
    avatar: "",
  });

  const logoutHandler = () => {
    CookRemove("jwt");
    window.location.reload();
  };

  useEffect(() => {
    getUserData(CookGet("jwt")).then((res) =>
      errorHandler(t, res.status, () => {
        res.data && setData(res.data);
        reloadCart();
      })
    );
  }, []);
  return (
    <>
      <Link href="/dash/cart" className="btn btn-ghost h-10 w-auto mb-2">
        <Badge badgeContent={state.cart} color="primary">
          <IconShoppingBag />
        </Badge>
      </Link>

      <div className="dropdown dropdown-right dropdown-end">
        <div tabIndex={0} role="button">
          <div className="avatar w-12 h-12">
            <div className="mask mask-squircle w-24">
              <Image
                src={data.avatar}
                alt="iran game"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 ms-5 w-64 shadow"
        >
          <div className="card-body flex flex-row">
            <div className="w-52 p-1">
              <div className="flex-inset w-full">
                <div className="mask mask-hexagon w-7 h-7">
                  <Image
                    src={data.avatar}
                    alt="iran game"
                    className="w-7 h-7"
                    width={100}
                    height={100}
                  />
                </div>
                <Tooltip
                  title={
                    <span className="text-md">
                      {t("click to copy") + " | " + data.username}
                    </span>
                  }
                  placement="top"
                >
                  <button
                    className="text-lg font-bold ms-2 text-hidden"
                    onClick={copyToClipboard}
                  >
                    {data.username}
                  </button>
                </Tooltip>
              </div>
              <div className="row w-full mt-2">
                <div className="col-12 p-1">
                  <button
                    onClick={logoutHandler}
                    className="btn btn-neutral btn-sm w-full"
                  >
                    <LogoutIcon />
                    {t("Logout")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Sidebar() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const loginHandler = () => {
    const authDialog = document.querySelector(
      "#auth-modal"
    ) as HTMLDialogElement;
    authDialog?.showModal();
  };

  useEffect(() => {
    auth().then((res) => {
      setIsLogin(res);
    });
  }, []);

  return (
    <>
      <div className="mLeft">
        <div className="sidebar mx-auto">
          <div className="flex flex-col align-items-center justify-items-center py-4 menu overflow-y-auto overflow-x-hidden">
            <Link href="/" className="avatar w-12 h-12">
              <div className="mask mask-squircle w-24">
                <Image
                  src="/logo.svg"
                  alt="iran game"
                  width={500}
                  height={500}
                />
              </div>
            </Link>
            <div className="border-2 border-white opacity-20 rounded w-4/6 my-2"></div>

            <Btns />

            <div className="absolute bottom-0 left-0 w-full flex-inset flex-col pb-2">
              {isLogin === null ? (
                <>
                  <div className="avatar w-12 h-12">
                    <div className="mask mask-squircle w-24">
                      <div className="skeleton h-32 w-32"></div>
                    </div>
                  </div>
                </>
              ) : isLogin ? (
                <Prof />
              ) : (
                <>
                  <button
                    className="btn btn-primary w-16"
                    onClick={loginHandler}
                  >
                    <span className="text-[12px] uppercase">{t("login")}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mDown">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-full rounded-lg border-2 border-white border-opacity-10 flex-inset">
          <BtnsTwo isLogin={isLogin} loginHandler={loginHandler} />
        </div>
      </div>
    </>
  );
}
