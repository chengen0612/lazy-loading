import { default as cx } from "classnames";

export function Fallback({ children, className }) {
  return (
    <div
      data-role="fallback"
      className={cx("absolute top-0 left-0", "h-full w-full", className)}
    >
      {children}
    </div>
  );
}
