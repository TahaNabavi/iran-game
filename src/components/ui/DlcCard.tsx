import Image from "next/image";
import priceFormat from "../global/priceFormat";
import { useTranslation } from "react-i18next";
import { CSSProperties } from "react";

type Data = {
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
}

export function FakeDlcCard() {
    return (
        <button className="m-7 w-72 h-44 bg-slate-600 rounded-xl flex-inset relative dlccardgame">
            <div className="h-48 w-64 absolute rounded-xl overflow-hidden z-10 timg">
                <div className="skeleton h-full w-full rounded-xl" style={{ "--fallback-b3": "#272f38" } as CSSProperties}></div>
            </div>
            <div className="w-full p-2 px-6 absolute bottom-0 -z-0">
                <div className="text-white text-bold">
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex-inset mt-1">
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </button>
    )
}

export default function DlcCard({ data, callback }: { data: Data; callback: () => void }) {

    const { t } = useTranslation();

    function getLowestPrice(data: Data): number {
        return Math.min(...data.prices.map((price) => price.amount * price.price_type.to_irr));
    }

    return (
        <>
            <button className="m-7 w-72 h-44 bg-slate-600 rounded-xl flex-inset relative dlccardgame" onClick={callback}>
                <div className="h-48 w-64 absolute rounded-xl overflow-hidden z-10 timg">
                    <Image src={data.image} alt="" className="h-full w-full rounded-xl bg-darkPattern" fill  />
                    {data.discount !== 0 && <div className="rotate-45 w-full h-10 flex-inset bg-slate-500 text-black text-bold absolute top-0 -right-24 ps-3">{data.discount}%</div>}
                </div>
                <div className="w-full p-2 px-6 absolute bottom-0 -z-0">
                    <div className="text-white text-bold">{data.name}</div>
                    <div className="flex-inset">
                        {data.discount !== 0 ?
                            <div className="flex">
                                <div className="takhfif me-1">
                                    {priceFormat(getLowestPrice(data))}
                                </div>
                                <div>
                                    {priceFormat(getLowestPrice(data) - (getLowestPrice(data) / 100 * data.discount))}
                                </div>
                            </div> :
                            <div>{priceFormat(getLowestPrice(data))}</div>}
                        <span className="ms-1">{t("Toman")}</span>
                    </div>
                </div>
            </button>
        </>
    )
}