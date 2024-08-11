"use client"

import { useEffect } from "react";
import InteractiveGrid from "../ui/interactive-grid";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function WelcomeModal() {

    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClose = () => {
        router.push("?")
    }

    useEffect(() => {
        if (searchParams.get("welcome")) {
            const modal = document.getElementById("welcome-modal") as HTMLDialogElement;
            modal?.showModal();
        }
    }, [searchParams])

    return (
        <dialog id="welcome-modal" className="modal">
            <div className="modal-box bg-opacity-0 p-0 bg-darkPattern">
                <InteractiveGrid>
                    <div className="pointer-events-none my-24 flex h-fit max-w-sm flex-col items-center justify-center text-center text-zinc-800">
                        <Image src="/logo.svg" className="w-20 h-20 absolute rounded-xl top-0 right-0" alt="" width="50" height="50" />
                        <h1 className="text-4xl font-bold w-24 text-center relative -left-20">
                            {t("Welcome to the Iran Game platform")}
                        </h1>
                        <p className="text-balance text-base">
                            {t("We hope you have a good time")}
                        </p>
                    </div>
                </InteractiveGrid>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}