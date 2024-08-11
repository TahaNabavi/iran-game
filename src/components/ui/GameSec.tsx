import { useTranslation } from "react-i18next"
import GameCard from "./gameCard"
import Timer from "./Timer";
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


export default function GameSection({ title, data, timer = false, more = false }: { title: string; data: Data[]; timer: number | false; more: string | false }) {

    const { t } = useTranslation()
    const router = useRouter();


    return (
        <div className="py-10 w-full row justify-content-center relative">
            <div className="col-12 my-2">
                <span className="text-3xl left-shadow ms-4 animated-text-shadow">{title.split("").map(e => <div className="sh-item">{e}</div>)}</span>
                {timer !== false &&
                    <>
                        <div className="flex-inset w-full">
                            <Timer timestamp={timer} />
                        </div>
                    </>}
            </div>

            {data.map((e, i) => (
                <GameCard data={e} key={`sa-d-g-${i}`} />
            ))}

            {more !== false &&
                <>
                    <div className="absolute z-10 w-full bg-gradient-to-t from-base-300 h-52 bottom-0 left-0"></div>
                    <div className="col-12 mt-4 z-20 flex-inset">
                        <button className="btn btn-ghost px-10" onClick={() => router.push(more)}>{"<--- "}{t("More")}{" --->"}</button>
                    </div>
                </>}
        </div>
    )
}