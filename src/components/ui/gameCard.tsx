import { useTranslation } from "react-i18next"
import Image from "next/image";
import React, { CSSProperties } from "react";
import priceFormat from "../global/priceFormat";
import { useRouter } from "next/navigation";

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

export default function GameCard({ data }: { data: Data }) {

    const { t } = useTranslation();
    const router = useRouter();

    const goToGame = () => {
        router.push(`/games/product/${data.title}`)
    }

    return (
        <button className="w-96 pt-16 m-2 gshcard" onClick={goToGame}>
            <div className="gCard h-52 rounded-xl bg-slate-800 relative">
                <div className="rounded-xl overflow-hidde absolute -top-16 -left-2 flex-inset header z-10">
                    <div className="w-[120px] h-[70px] absolute -top-2 -left-2 rounded-br-xl border-base-300 border-8 gibesh">
                        <div className="w-full h-full bg-base-300">
                            <Image src={data.logo} alt="" className="w-full h-full rounded" width={200} height={200} />
                        </div>
                    </div>
                    <Image src={data.image_one} alt="" className="w-96 h-48 rounded-xl" width="600" height="250" />
                    <div className="absolute right-2"
                        style={{ maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)", backdropFilter: "blur(5px)" } as CSSProperties}
                    >
                        {data.tags.map((e, i) => (
                            <div className="bg-slate-800 bg-opacity-30 text-white backdrop-blur-sm px-3 rounded-md my-1" key={`tgv-d-${i}`}>{t(e)}</div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full px-4 pb-3 flex-inset">
                    <div className="text-bold text-xl text-hidden">{data.title}</div>
                    <div className="text-lg ms-auto relative">
                        {data.discount !== 0 ? <>
                            <div className="flex-inset">
                                <div className="takhfif">{priceFormat(data.prices[0].amount * data.prices[0].price_type.to_irr)}</div>
                                <div className="border h-4 rotate-6 mx-1 border-opacity-30 border-slate-500"></div>
                                <div className="">{priceFormat((data.prices[0].amount * data.prices[0].price_type.to_irr) - ((data.prices[0].amount * data.prices[0].price_type.to_irr) / 100 * data.discount))}</div>
                            </div>
                            <div className="flex-inset">
                                <div className="">{t("Toman")}</div>
                                <div className="bg-sky-800 scale-75 ms-1 py-1 px-3 rounded-lg text-white">{data.discount}%</div>
                            </div>
                        </> : <>
                            <div className="flex">
                                {priceFormat(data.prices[0].amount * data.prices[0].price_type.to_irr)}
                            </div>
                            <div className="flex">
                                {t("Toman")}
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </button>
    )
}

export function FakeGameCard(): React.ReactNode {
    return (
        <button className="w-96 pt-16 m-2 gshcard">
            <div className="gCard h-52 rounded-xl bg-slate-800 relative">
                <div className="rounded-xl overflow-hidde absolute -top-16 -left-2 flex-inset header z-10">
                    <div className="w-16 h-16 absolute -top-2 -left-2 rounded-br-xl border-base-300 border-8 gibesh">
                        <div className="w-full h-full bg-base-300">
                            <div className="skeleton w-full h-full rounded" style={{ backgroundColor: "#171d26" }}></div>
                        </div>
                    </div>

                    <div className="skeleton w-96 h-48 rounded-xl" style={{ backgroundColor: "#171d26" }}></div>
                    <div className="absolute right-2"
                        style={{ maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)", backdropFilter: "blur(5px)" } as CSSProperties}
                    >
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full px-4 pb-3 flex-inset">
                    <div className="text-bold text-xl text-hidden">
                        <div className="skeleton h-4 w-20"></div>
                    </div>
                    <div className="text-lg ms-auto relative">

                        <div className="flex">
                            <div className="skeleton h-4 w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}