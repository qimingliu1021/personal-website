import Link from "next/link";
import clsx from "clsx";

const Button = ({ invert, href, className, children, ...props }) => {
  className = clsx(
    className,
    "qiming-articles-btn inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200"
  );

  const style = {
    backgroundColor: "#ffffff",
    color: "rgb(0, 46, 255)",
  };

  let inner = <span>{children}</span>;
  if (href) {
    return (
      <Link href={href} className={className} style={style} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={className} style={style} {...props}>
      {inner}
    </button>
  );
};

export default Button;
