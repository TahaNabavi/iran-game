import { CSSProperties, useContext, useRef, useState } from "react";
import inputTyper from "../global/typer";
import priceFormat from "../global/priceFormat";
import { useTranslation } from "react-i18next";
import { AppContext } from "@/app/context/MyContext";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-toastify";
import {
  IconMailFilled,
  IconFingerprint,
  IconSignature,
  IconAuth2fa,
} from "@tabler/icons-react";

type Inapp_prices = {
  id: number;
  title: string;
  amount: number;
  price_type: {
    to_irr: number;
  };
};

type Inapp_item = {
  id: number;
  title: string;
  logo: string;
  inapp_prices: Inapp_prices[];
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
  inapp_item: Inapp_item | null;
};

type OnFinish = (
  username: string | null,
  password: string | null,
  acc_id: string | null,
  acc_name: string | null,
  email: string | null,
  backup_code: string | null,
  inapp_prices_id: number,
  callback: (success: boolean) => void
) => void;

export default function BuyInapp({
  data,
  onClose,
  onFinish,
}: {
  data: Data;
  onClose: () => void;
  onFinish: OnFinish;
}) {
  const { t } = useTranslation();

  const { reloadCart } = useContext(AppContext);

  const email = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const acc_id = useRef<HTMLInputElement>(null);
  const acc_name = useRef<HTMLInputElement>(null);
  const backup_code = useRef<HTMLInputElement>(null);
  const error = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [buy, setBuy] = useState<Inapp_prices | undefined>(undefined);

  const closeHandler = () => {
    onClose();
    const modal = document.getElementById(
      "inapp-buy-modal"
    ) as HTMLDialogElement;
    modal?.close();
  };

  const addHandler = () => {
    setLoading(true);
    const err = error.current;
    if (err) {
      const emai = email.current;
      const user = username.current;
      const pass = password.current;
      const aid = acc_id.current;
      const aname = acc_name.current;
      const bac = backup_code.current;

      if (data.buy_username && user?.value.length === 0) {
        inputTyper(err, t("Please enter a username"));
      } else if (data.buy_password && pass?.value.length === 0) {
        inputTyper(err, t("Please enter a password"));
      } else if (data.buy_email && emai?.value.length === 0) {
        inputTyper(err, t("Please enter an email"));
      } else if (data.buy_id && aid?.value.length === 0) {
        inputTyper(err, t("Please enter a id"));
      } else if (data.buy_name && aname?.value.length === 0) {
        inputTyper(err, t("Please enter a name"));
      } else {
        buy &&
          onFinish(
            user ? user.value : null,
            pass ? pass.value : null,
            aid ? aid.value : null,
            aname ? aname.value : null,
            emai ? emai.value : null,
            bac ? bac.value : null,
            buy.id,
            (res) => {
              if (res) {
                closeHandler();
                setBuy(undefined);
                reloadCart();
                toast.success(t("Added to your shopping cart"));
              } else err && inputTyper(err, t("E.ns"));
            }
          );
      }
    }
    setTimeout(() => setLoading(false), 200);
  };

  const setHandler = (id: number) => {
    setBuy(data.inapp_item?.inapp_prices.filter((g) => g.id === id)[0]);
  };
  const backHandler = () => {
    setBuy(undefined);
  };

  return (
    <dialog id="inapp-buy-modal" className="modal">
      <div className={`modal-box pb-0 ${loading && "ops"}`}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeHandler}
        >
          ✕
        </button>
        {buy === undefined ? (
          <>
            <div className="flex-inset flex-col">
              <div className="flex-inset">
                <img
                  src={data.logo}
                  alt=""
                  className="rounded-md bg-darkPattern border-white border-opacity-20 border-2 w-10 h-10"
                />
                <span className="text-lg first-letter:uppercase ms-2">
                  {data.title}
                </span>
              </div>
              <div className="border-2 w-8/12 border-opacity-40 border-blue-600 my-2"></div>
            </div>
            <div className="w-full flex-inset row">
              {data.inapp_item &&
                data.inapp_item.inapp_prices.map((e, i) => (
                  <div className="col-6 p-2" key={`iam-m-${i}`}>
                    <button
                      onClick={() => setHandler(e.id)}
                      className="border-white border-opacity-10 border-2 rounded-lg p-2 text-center h-full shadow-lg w-full"
                    >
                      {e.title}
                      <div className="bg-slate-700 rounded-md mt-1 p-2 text-center">
                        {priceFormat(e.amount * e.price_type.to_irr)}
                        <span className="ms-1 text-sm">{t("Toman")}</span>
                      </div>
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex-inset flex-col p-1">
              <div className="flex w-full">
                <span className="flex-inset">
                  <img
                    src={data.inapp_item?.logo}
                    alt=""
                    className="w-8 h-8 me-1 rounded-md bg-darkPattern border-white border-opacity-20 border-2"
                  />
                  {buy.title}
                </span>
                <div className="bg-slate-700 rounded-md mt-1 p-2 text-center flex-inset ms-auto">
                  {priceFormat(buy.amount * buy.price_type.to_irr)}
                  <span className="ms-1 text-sm">{t("Toman")}</span>
                </div>
              </div>

              <div className="border-2 border-white border-opacity-10 w-8/12 my-2"></div>

              <div className="text-center">
                <div className="text-lg">{data.buy_help_title}</div>
                {data.buy_help_body}
              </div>

              {data.buy_email && (
                <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                  <IconMailFilled />
                  <input
                    type="text"
                    className="grow"
                    placeholder={t("email")}
                    ref={email}
                  />
                </label>
              )}
              {data.buy_username && (
                <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                  <PersonIcon />
                  <input
                    type="text"
                    className="grow"
                    placeholder={t("username")}
                    ref={username}
                  />
                </label>
              )}
              {data.buy_password && (
                <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                  <KeyIcon />
                  <input
                    type="text"
                    className="grow"
                    placeholder={t("password")}
                    ref={password}
                  />
                </label>
              )}
              {data.buy_id && (
                <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                  <IconFingerprint />
                  <input
                    type="text"
                    className="grow"
                    placeholder={t("account id")}
                    ref={acc_id}
                  />
                </label>
              )}
              {data.buy_name && (
                <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                  <IconSignature />
                  <input
                    type="text"
                    className="grow"
                    placeholder={t("account name")}
                    ref={acc_name}
                  />
                </label>
              )}
              {data.buy_backup_code && (
                <label className="input input-bordered flex items-center gap-2 w-8/12 my-1">
                  <IconAuth2fa />
                  <input
                    type="text"
                    className="grow"
                    placeholder={t("backup code")}
                    ref={backup_code}
                  />
                </label>
              )}

              <div className="flex">
                <button className="btn  my-2 me-1" onClick={backHandler}>
                  {t("Back")}
                </button>
                <button className="btn btn-neutral my-2" onClick={addHandler}>
                  {t("Add to cart")}
                </button>
              </div>
              <input
                type="text"
                className="all-unset --color pointer-events-none"
                style={{ "--color": "red" } as CSSProperties}
                ref={error}
              />
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
