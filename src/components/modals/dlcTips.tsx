"use client";

import { useEffect, useState } from "react";
import Meteors from "../ui/meteors";
import { getDlcTips } from "@/components/action/getTips";

export default function DLCTips() {
  const [data, setData] = useState<string>("");

  const closeHandler = () => {
    const modal = document.getElementById(
      "dlc-tips-modal"
    ) as HTMLDialogElement;
    modal?.close();
  };

  useEffect(() => {
    getDlcTips().then((res) => {
      if (res) setData(res.text);
    });
  }, []);

  return (
    <dialog id="dlc-tips-modal" className="modal">
      <div className="modal-box overflow-x-hidden p-7 min-h-72 flex-inset flex-col">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeHandler}
        >
          ✕
        </button>
        <Meteors number={30} />
        <div dangerouslySetInnerHTML={{ __html: data }}></div>
      </div>
    </dialog>
  );
}
