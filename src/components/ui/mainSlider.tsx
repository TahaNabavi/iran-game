"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import priceFormat from "../global/priceFormat";

type Data = {
    title: string,
    description: string,
    discount: number,
    tags: string[],
    image_one: string,
    image_two: string,
    image_three: string,
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

export default function MainSlider({ insertData }: { insertData: Data[] }) {

    const { t } = useTranslation();
    const router = useRouter();

    const [data, setData] = useState<Data[]>(insertData)
    const [show, setShow] = useState<number>(0)
    const [TO, setTO] = useState<boolean>(true)

    const tagHandler = (term: string) => {
        router.push(`/games/search?tags=${term}`)
    }

    const showImgHandler = (i: number, id: number) => {
        const img = document.querySelectorAll(`#slider-img-${i}-${id}`)
        img.forEach(e => e?.classList.remove("opacity-0"))
    }
    const unShowImgHandler = (i: number, id: number) => {
        const img = document.querySelectorAll(`#slider-img-${i}-${id}`)
        img.forEach(e => e?.classList.add("opacity-0"))
    }
    const buyHandler = (title: string) => {
        router.push(`/games/product/${title}`)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (TO) {
                setShow(prevShow => {
                    const nextShow = prevShow + 1;
                    return nextShow >= data.length ? 0 : nextShow;
                });
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [TO, data.length]);

    return (
        <>
            <div className="slider flex flex-col lg:flex-row">
                <div className="mainImg lg:h-full lg:w-4/6 mb-2 lg:mb-0 w-full sm:h-96 h-72 rounded-xl overflow-hidden relative ">
                    <div className="absolute top-2 left-2 flex z-20">
                        {data[show]?.tags && data[show].tags.map((e, i) =>
                            <button key={`ts-g-${i}`} onClick={() => tagHandler(e)} className="hover:tracking-widest transition-all pb-1 pt-1 px-3 text-white rounded-xl bg-white bg-opacity-10 backdrop-blur-sm me-1 text-sm lowercase font-bold tracking-wider" style={{ fontVariant: "small-caps" } as CSSProperties}>
                                {t(e)}
                            </button>
                        )}
                    </div>
                    <Image src={data[show]?.image_one} alt="" className="h-full w-full absolute" fill />
                    <Image src={data[show]?.image_two} alt="" className="h-full w-full absolute opacity-0 z-10 transition ease-out delay-300" fill id={`slider-img-${show}-2`} />
                    <Image src={data[show]?.image_three} alt="" className="h-full w-full absolute opacity-0 z-10 transition ease-out delay-300" fill id={`slider-img-${show}-1`} />
                </div>
                <div className="lg:h-full h-96 md:h-56 lg:w-2/6 w-full lg:ps-2 flex md:flex-row flex-col lg:flex-col">
                    <div className="about lg:h-3/5 lg:w-full h-56 w-full md:w-auto  pb-2">
                        <div className=" h-full w-full overflow-hidden rounded-xl relative">
                            <Image src={data[show]?.image_one} alt="" className="h-full w-full absolute top-0 left-0" width="700" height="700" />
                            <Image src={data[show]?.image_two} alt="" className="h-full w-full absolute top-0 left-0 opacity-0 transition ease-out delay-300" width="700" height="700" id={`slider-img-${show}-2`} />
                            <Image src={data[show]?.image_three} alt="" className="h-full w-full absolute top-0 left-0 opacity-0 transition ease-out delay-300" width="700" height="700" id={`slider-img-${show}-1`} />
                            <div className="w-full h-full px-4 py-7 pb-1 backdrop-blur-xl relative bg-darkPattern bg-opacity-60">
                                <div className="text-xl font-bold first-letter:uppercase" >
                                    {data[show]?.title}
                                </div>
                                <p className="text-md" dangerouslySetInnerHTML={{ __html: `${data[show]?.description.substring(0, 186)} ${data[show]?.description.length > 186 && " ..."}` }}></p>
                                <div className="absolute bottom-0 left-0 flex p-2 w-full">
                                    <button onClick={() => buyHandler(data[show]?.title)} className="btn btn-ghost backdrop-blur-lg relative flex-inset bg-white bg-opacity-20">
                                        {t("Buy now")}
                                        {data[show]?.discount !== 0 &&
                                            <div className="ms-1 p-2 bg-slate-700 rounded-xl">
                                                {data[show]?.discount}%
                                            </div>
                                        }
                                    </button>
                                    <div className="flex-inset me-2 ms-auto">
                                        <div className="me-1">
                                            {data[show]?.discount === 0 ?
                                                <div>{priceFormat(data[show]?.prices[0].amount * data[show]?.prices[0].price_type.to_irr)}</div> :
                                                <>
                                                    <div className="takhfif">{priceFormat(data[show]?.prices[0].amount * data[show]?.prices[0].price_type.to_irr)}</div>
                                                    <div>{priceFormat((data[show]?.prices[0].amount * data[show]?.prices[0].price_type.to_irr) - ((data[show]?.prices[0].amount * data[show]?.prices[0].price_type.to_irr) / 100 * data[show]?.discount))}</div>
                                                </>
                                            }
                                        </div>
                                        <div>
                                            تومان
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="someImg lg:h-2/5 md:h-full h-36 w-full relative flex-inset">
                        <div className="absolute h-full w-full">
                            <div className="flex h-full w-full md:flex-col lg:flex-row">
                                <button onMouseEnter={() => showImgHandler(show, 1)} onMouseLeave={() => unShowImgHandler(show, 1)} className="p-1 w-2/4 h-full lg:w-2/4 lg:h-full md:w-full md:h-2/4">
                                    <Image src={data[show]?.image_three} alt="" className="h-full w-full rounded-xl overflow-hidden" width="1250" height="700" />
                                </button>
                                <button onMouseEnter={() => showImgHandler(show, 2)} onMouseLeave={() => unShowImgHandler(show, 2)} className="p-1 w-2/4 h-full lg:w-2/4 lg:h-full md:w-full md:h-2/4">
                                    <Image src={data[show]?.image_two} alt="" className="h-full w-full rounded-xl overflow-hidden" width="1250" height="700" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="slidebar mt-3 w-full flex-inset">
                {data.map((_, i) => (
                    <button onClick={() => setShow(i)} className={`${show === i ? "w-8 border-sky-400 border-opacity-60 drop-shadow-md" : "w-4 border-white border-opacity-10"} h-1 rounded border-2 mx-1 backdrop-blur-sm hover:w-8 hover:border-opacity-80 transition-all ease-in-out`} key={`sb-n-${i}`}></button>
                ))}
            </div>
        </>
    );
}
