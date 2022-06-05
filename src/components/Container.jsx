import { default as cx } from "classnames";

export default function Container({ children, className }) {
  return <div className={cx("mx-auto ", className)}>{children}</div>;
}
