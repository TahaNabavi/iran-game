import { CSSProperties, MouseEvent } from "react";
import { SteamLoaderOne } from "./steamLoader";


export default function SteamProfileCard({ username, password, callback }: { username: string; password: string; callback: (e: MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <button onClick={(e) => callback(e)} className="w-8/12 h-14 steamCard">
            <div className="box relative">
                <SteamLoaderOne />
                <div className="relative h-full flex-inset flex-col mx-auto">
                    <div className="text-[14px] text-hidden">{username}</div>
                    <div className="pass text-hidden" style={{ "--size": "14px" } as CSSProperties}>
                        <div className="iss flex">
                            {
                                password.split("").map((e, i) => (
                                    <span className="is" style={{ "--delay": `${i * 0.02}s` } as CSSProperties} key={i}>
                                        {e}
                                    </span>
                                ))
                            }
                        </div>
                        <div className="stars flex-inset">
                            {
                                password.split("").map((e, i) => (
                                    <span className="star" style={{ "--delay": `${i * 0.02}s` } as CSSProperties} key={i}>
                                        *
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}