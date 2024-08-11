import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconPinFilled } from "@tabler/icons-react";

type Data =
  | {
      inapp_item: {
        logo: string;
      }[];
      pin: boolean;
      title: string;
      logo: string;
    }
  | {
      inapp_item: {
        logo: string;
      }[];
      title: string;
      logo: string;
    };

export default function InappCard({ data }: { data: Data }) {
  const router = useRouter();

  const clickHandler = (title: string) => {
    router.push(`/inapp/product/${title}`);
  };

  return (
    <>
      <button
        className="bg-base-100 p-2 rounded-2xl w-36 mx-2 relative"
        onClick={() => clickHandler(data.title)}
      >
        {/* {"pin" in data && (
          <div className="absolute top-2 right-2">
            <IconPinFilled />
          </div>
        )} */}
        <Image
          src={data.logo}
          alt={data.title}
          width="500"
          height="500"
          className="w-[138px] h-[138px] mb-4 rounded-2xl shadow-lg"
        />
        <h5 className="w-full text-center text-hidden">{data.title}</h5>
        <div className="bg-darkPattern bg-opacity-50 text-white py-2 my-1 w-full text-center rounded-xl shadow-md hover:shadow-none transition duration-700 ease-in-out px-1 flex-inset">
          {data.inapp_item.map((e, i) => (
            <Image
              src={e.logo}
              key={`iap-y-${i}`}
              alt=""
              width="500"
              height="500"
              className="w-6 h-6 rounded-md mx-[1px]"
            />
          ))}
        </div>
      </button>
    </>
  );
}
export function FakeInappCard() {
  return (
    <div className="bg-base-100 p-2 rounded-2xl w-36 mx-2">
      <div className="skeleton h-[130px] w-[130px] rounded-2xl shadow-lg"></div>
      <h5 className="w-full text-center text-hidden my-2 flex-inset">
        <div className="skeleton h-4 w-20"></div>
      </h5>
      <div className="bg-darkPattern bg-opacity-50 text-white py-2 my-1 w-full text-center rounded-xl shadow-md hover:shadow-none transition duration-700 ease-in-out px-1 flex-inset">
        <div className="skeleton h-6 w-6 rounded-md mx-1"></div>
        <div className="skeleton h-6 w-6 rounded-md mx-1"></div>
        <div className="skeleton h-6 w-6 rounded-md mx-1"></div>
        <div className="skeleton h-6 w-6 rounded-md mx-1"></div>
      </div>
    </div>
  );
}
