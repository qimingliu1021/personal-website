import Link from "next/link";
import clsx from "clsx";

const Button = ({ invert, href, className, children, ...props }) => {
  className = clsx(
    className,
    "inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200",
    invert ? "qiming-btn-on-yellow" : "qiming-btn-on-blue"
  );

  let inner = <span>{children}</span>;
  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={className} {...props}>
      {inner}
    </button>
  );
};

export default Button;
