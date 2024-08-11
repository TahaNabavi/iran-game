import Image from "next/image";
import priceFormat from "@/components/global/priceFormat";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { IconPinFilled } from "@tabler/icons-react";

type Data =
  | {
      pin: boolean;
      title: string;
      logo: string;
      amount: number;
      app_id:number;
    }
  | {
      title: string;
      logo: string;
      amount: number;
      app_id:number;
    };

export function FakeMarketCard() {
  return (
    <div className="w-full h-20 flex-inset p-2 bg-black bg-opacity-20 rounded-lg my-1">
      <div className="skeleton w-16 h-16 rounded-md shadow-lg"></div>
      <span className="ms-1 flex">
        <div className="skeleton h-4 w-24 rounded-md mx-1"></div>
        <div className="skeleton h-4 w-28 rounded-md mx-1"></div>
      </span>
      <span className="ms-auto">
        <div className="skeleton h-4 w-32 rounded-md mx-1"></div>
      </span>
    </div>
  );
}

export default function MarketCard({ data }: { data: Data }) {
  const router = useRouter();
  const { t } = useTranslation();

  const handler = () => {
    router.push(`/market/product/${data.app_id}/${data.title}`);
  };

  return (
    <>
      <button
        onClick={handler}
        className="w-full h-20 flex-inset p-2 bg-black bg-opacity-20 rounded-lg my-1 relative"
      >
        {/* {"pin" in data && (
          <div className="absolute top-1 right-1">
            <IconPinFilled />
          </div>
        )} */}
        <Image
          src={data.logo}
          alt=""
          className="w-16 h-16 rounded-md shadow-lg"
          width="400"
          height="400"
        />
        <span className="ms-1">{data.title}</span>
        <span className="ms-auto">{priceFormat(data.amount)}</span>
        <span className="ms-1">{t("Toman")}</span>
      </button>
    </>
  );
}
