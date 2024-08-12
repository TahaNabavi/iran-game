"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next";
import Meteors from "../ui/meteors";
import { Input } from "../ui/input";
import { IconUserFilled, IconKeyFilled, IconAlertOctagonFilled } from "@tabler/icons-react";
import { MouseEvent, useRef, useState } from "react";
import { getEmailVerifyGoogle, getLogin } from "../action/getAuth";
import { typer } from "../global/typer";
import { CookSet } from "../global/cookie";
import { setQueries } from "../global/query";
import { GOOGLE_CLIENT_ID } from "conf";
import { gapi } from "gapi-script";
import errorHandler from "../global/errorHandler";
import Link from "next/link";

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

export default function AuthModal() {

    const { t } = useTranslation();
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const error = useRef<HTMLSpanElement>(null)

    const [loading, setLoading] = useState<boolean>(false);

    const onClose = () => {
        router.push("?")
    }

    const submitHandler = () => {
        setLoading(true);
        if (email.current && password.current) {
            const ema = email.current.value,
                pas = password.current.value;
            if (ema.length === 0) {
                typer(error, t("E.log2"));
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(ema)) {
                typer(error, t("E.log4"));
            } else if (pas.length === 0) {
                typer(error, t("E.log3"));
            } else getLogin(ema, pas).then((res) => {
                if (res.status === 10) {
                    typer(error, t("E.log1"));
                } else if (res.status === 200 && res.data) {
                    CookSet("jwt", res.data);
                    window.location.reload()
                } else typer(error, t("E.unknown"));
            })
        } else typer(error, t("E.unknown"));

        setTimeout(() => setLoading(false), 200);
    }

    function googleHandler(event: MouseEvent<HTMLButtonElement>) {
        let initClient = () => {
            (gapi as any).auth2
                .init({
                    client_id: GOOGLE_CLIENT_ID,
                    cookiepolicy: "single_host_origin",
                    prompt: "select_account",
                })
                .then((auth2: any) => {
                    auth2.attachClickHandler(event.target, {}, onSuccess, onError);
                });
        };

        let onSuccess = (googleUser: any) => {
            let profile = googleUser.getBasicProfile();
            getEmailVerifyGoogle(
                profile.getEmail(),
                googleUser.getAuthResponse().id_token
            ).then((res) => {
                errorHandler(t, res.status, () => {
                    if (res.status === 200) {
                        CookSet("jwt", res.data);
                        res.new &&
                            router.replace(`?${setQueries([{ key: "welcome", value: "true" }])}`)
                        window.location.reload()
                    }
                })
            });
        };

        let onError = (error: any) => {
            console.log(error);
        };

        gapi.load("auth2", initClient);
    }


    return (
        <dialog id="auth-modal" className="modal">
            <div className="modal-box overflow-x-hidden">
                <Meteors number={30} />
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                </form>
                <div className={`flex-inset flex-col w-full ${loading && "ops"}`}>
                    <h1 className="text-2xl mb-3">{t("Login with")}</h1>
                    <button
                        onClick={googleHandler}
                        className="h-10 flex-inset bg-gradient-to-br relative px-3 group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    >
                        <Image src="/google.png" className="h-5 w-5" alt="" width="50" height="50" />
                        <span className="ms-2 text-lg">{t("Google")}</span>
                        <BottomGradient />
                    </button>

                    <div className="divider uppercase w-7/12 mx-auto">{t("or")}</div>

                    <div className="w-8/12">
                        <div className="flex mb-1">
                            <IconUserFilled />
                            <span className="ms-1">{t("Email")}</span>
                        </div>
                        <Input ref={email} placeholder="sample@gmail.com" type="text" className="w-full" />
                    </div>
                    <div className="w-8/12 mt-2">
                        <div className="flex mb-1">
                            <IconKeyFilled />
                            <span className="ms-1">{t("Password")}</span>
                        </div>
                        <Input ref={password} placeholder="* * * * * *" type="password" className="w-full" />
                    </div>

                    <button
                        onClick={!loading ? submitHandler : undefined}
                        className="w-6/12 bg-gradient-to-br mt-5 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    >
                        {loading ?
                            <span className="loading loading-spinner loading-md mt-1"></span> : t("Login")}
                        <BottomGradient />
                    </button>

                    <span ref={error} className="mt-1 text-red-600"></span>

                    <span className="mt-2 flex">
                        <div className="me-1">
                            <IconAlertOctagonFilled />
                        </div>
                        <div className="">
                            <p>{t("By logging in to our website, you acknowledge that you have read, understood, and agree to be bound by our")} <Link className="link" href="/terms-of-service">{t("Terms of Service")}</Link> {t("and")} <Link className="link" href="/privacy-policy">{t("Privacy Policy")}</Link>.</p>
                            <p>{t("Please note that by proceeding, you confirm that you have read and agree to our terms and conditions. If you do not agree, please do not log in.")}</p>
                        </div>
                    </span>
                </div>
            </div>
        </dialog>
    )
}