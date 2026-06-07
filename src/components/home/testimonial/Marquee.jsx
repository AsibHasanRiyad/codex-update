import { cn } from "../../../lib/utils";

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "group overflow-hidden [--duration:40s]",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max items-center",
          {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "[animation-direction:reverse]": reverse,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
          }
        )}
      >
        <div className={cn("flex items-center", { "flex-row": !vertical, "flex-col": vertical })}>
          {children}
        </div>
        <div className={cn("flex items-center", { "flex-row": !vertical, "flex-col": vertical })}>
          {children}
        </div>
      </div>
    </div>
  );
}
