import { cn } from "@/utils/cn";
import DIR from "@comp-global/dir";

export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-3xl relative flex items-center ms-4 animated-text-shadow my-4 before:h-[80%] before:rounded-[50px] before:w-[4px] before:bg-[#3abef9] before:absolute",
        DIR("before:right-[-15px] before:shadow-[-2px_0_4px_#3abef9]","before:left-[-15px] before:shadow-[2px_0_4px_#3abef9]",""),
        className
      )}
    >
      <div className="sh-item">{text}</div>
    </span>
  );
}
