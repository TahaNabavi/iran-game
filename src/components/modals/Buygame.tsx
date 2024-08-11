import { CSSProperties, MouseEvent, useContext, useRef, useState } from "react";
import inputTyper from "../global/typer";
import priceFormat from "../global/priceFormat";
import { useTranslation } from "react-i18next";
import SteamProfileCard from "../ui/steamProfileCard";
import { AppContext } from "@/app/context/MyContext";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import Image from "next/image";
import { toast } from "react-toastify";
import { IconAuth2fa } from "@tabler/icons-react";

export default function Buygame({
  data,
  onClose,
  onFinish,
}: {
  data: {
    game_name: string;
    discount: number;
    id: number;
    amount: number;
    price_type: {
      name: string;
      image: string;
      to_irr: number;
    };
  } | null;
  onClose: () => void;
  onFinish: (
    username: string,
    password: string,
    backup_code: string,
    price_id: number,
    callback: (success: boolean) => void
  ) => void;
}) {
  const { t } = useTranslation();

  const { state, setPlatformAccount, reloadCart } = useContext(AppContext);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const backup_code = useRef<HTMLInputElement>(null);
  const error = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const closeHandler = () => {
    onClose();
    const modal = document.getElementById(
      "game-buy-modal"
    ) as HTMLDialogElement;
    modal?.close();
  };
  const setProfile = (event: MouseEvent<HTMLButtonElement>) => {
    const btn = event.currentTarget;
    btn.classList.add("ops");
    setTimeout(() => btn.classList.remove("ops"), 500);
    const ptData: { username: string; password: string } =
      state.platformAccount[0].data;
    if (username.current) inputTyper(username.current, ptData.username);
    if (password.current) inputTyper(password.current, ptData.password);
  };
  const addHandler = () => {
    setLoading(true);
    if (error.current) {
      const pass = password.current;
      const user = username.current;
      const bac = backup_code.current;

      if (user?.value.length === 0) {
        inputTyper(error.current, t("Please enter a username"));
      } else if (pass?.value.length === 0) {
        inputTyper(error.current, t("Please enter a password"));
      } else {
        if (user && pass && data && bac) {
          onFinish(user.value, pass.value, bac.value, data.id, (res) => {
            if (res) {
              closeHandler();
              reloadCart();
              toast.success(t("Added to your shopping cart"));
              setPlatformAccount({
                type: "steam",
                data: {
                  username: user.value,
                  password: pass.value,
                },
              });
            } else error.current && inputTyper(error.current, t("E.ns"));
          });
        } else {
          inputTyper(error.current, t("E.ns"));
        }
      }
    }
    setTimeout(() => setLoading(false), 200);
  };

  const tipsHandler = () => {
    const modal = document.getElementById(
      "game-tips-modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <dialog id="game-buy-modal" className="modal">
      <div className={`modal-box pb-0 ${loading && "ops"}`}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeHandler}
        >
          ✕
        </button>
        {data && (
          <>
            <div>
              {t("Buy Game") + " : " + data.game_name}
              <div className="ms-2 mt-2">
                <div className="flex">
                  {data.discount === 0 ? (
                    priceFormat(data.amount * data.price_type.to_irr)
                  ) : (
                    <>
                      <span className="takhfif mx-2">
                        {priceFormat(data.amount * data.price_type.to_irr)}
                      </span>
                      {priceFormat(
                        data.amount * data.price_type.to_irr -
                          ((data.amount * data.price_type.to_irr) / 100) *
                            data.discount
                      )}
                    </>
                  )}
                  <span className="ms-1 me-auto">{t("Toman")}</span>
                  {data.price_type.image ? (
                    <Image
                      src={data.price_type.image}
                      alt=""
                      width="320"
                      height="240"
                      className="h-6 w-8 rounded-sm"
                    />
                  ) : (
                    data.price_type.name
                  )}
                </div>
              </div>
            </div>

            <div className="border border-white border-opacity-10 w-full my-3"></div>

            <div className="flex-inset flex-col w-full">
              {state.platformAccount.length !== 0 &&
                state.platformAccount[0].type === "steam" && (
                  <>
                    <SteamProfileCard
                      username={state.platformAccount[0].data.username}
                      password={state.platformAccount[0].data.password}
                      callback={setProfile}
                    />
                    <div className="divider w-7/12 mx-auto">{t("or")}</div>
                  </>
                )}
            </div>

            <div className="flex-inset flex-col w-full">
              <label className="input input-bordered flex items-center gap-2 w-8/12">
                <PersonIcon />
                <input
                  type="text"
                  className="grow"
                  placeholder={t("username")}
                  ref={username}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 w-8/12 mt-2">
                <KeyIcon />
                <input
                  type="password"
                  className="grow"
                  placeholder={t("password")}
                  ref={password}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 w-8/12 my-2">
                <IconAuth2fa />
                <input
                  type="text"
                  className="grow"
                  placeholder={t("backup code")}
                  ref={backup_code}
                />
              </label>
            </div>

            <div className="flex-inset flex-col">
              <button className="btn btn-neutral my-2" onClick={addHandler}>
                {t("Add to cart")}
              </button>
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
