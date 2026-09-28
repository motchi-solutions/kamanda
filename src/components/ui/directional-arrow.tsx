import { LuArrowRight } from "react-icons/lu";

type Direction = "right" | "up-right" | "up" | "down";

export function DirectionalArrow({
  direction = "right",
}: {
  direction?: Direction;
}) {
  return (
    <span className={`directional-arrow arrow-${direction}`} aria-hidden="true">
      <LuArrowRight className="arrow-glyph" />
    </span>
  );
}
