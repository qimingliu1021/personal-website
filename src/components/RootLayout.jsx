"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import CitiesPage from "./CitiesPage";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import Qiming from "../images/qiming-white.svg";
import QimingBlack from "../images/qiming-black.svg";
import QimingChinese from "../images/qiming-chinese.svg";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import clsx from "clsx";
import SocialMedia from "./SocialMedia";
import Footer from "./Footer";

const Header = ({
  panelId,
  invert = false,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
}) => {
  // Container
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link href={"/"} aria-label="Home">
          <Image
            src={expanded ? QimingBlack : Qiming}
            alt="Qiming Logo"
            width={120}
            height={40}
          />
        </Link>

        <div className="sm:border-l sm:border-transparent sm:pl-16">
          <h2
            className="font-display text-base font-semibold"
            style={{ color: invert ? "#000000" : undefined }}
          >
            Stay in touch
          </h2>
          <SocialMedia className="mt-6" invert={!invert} />
        </div>

        <div className="flex items-center gap-x-4">
          <Button onClick={onToggle} invert={invert}>
            Articles
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded.toString()}
            aria-controls={panelId}
            className={clsx(
              "-m-2.5 rounded-full p-2.5 transition-colors duration-200",
              invert ? "qiming-btn-on-yellow" : "qiming-btn-on-blue"
            )}
            aria-label="Toggle navigation"
          >
            <Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </Container>
  );
};

const DROPDOWN_BG = "rgb(255, 210, 23)";
const DROPDOWN_FG = "#000000";

const articles = [
  "I never thought I'd do startups",
  "I Ching",
  "I hate CS, I thank CS",
  "The matches",
  "Toxic motivation - Hate and Anxiety",
];

const ArticleLink = ({ children }) => {
  return (
    <Link
      href="#"
      className="group relative inline-flex items-center gap-3 text-xl font-medium"
      style={{ color: DROPDOWN_FG }}
    >
      <span className="relative">
        <span className="relative z-10">{children}</span>
        <span
          className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{ backgroundColor: DROPDOWN_FG }}
        />
      </span>
      <span
        aria-hidden
        className="ml-1 inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ color: DROPDOWN_FG }}
      >
        →
      </span>
    </Link>
  );
};

const ArticlesNavigation = () => {
  return (
    <div
      className="relative"
      style={{ backgroundColor: DROPDOWN_BG }}
    >
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="flex flex-col gap-4">
          {articles.map((title) => (
            <ArticleLink key={title}>{title}</ArticleLink>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScrollHint = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to next section"
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer bg-transparent p-2"
    >
      <motion.svg
        width="44"
        height="56"
        viewBox="0 0 44 56"
        fill="none"
        animate={{ y: [0, 6, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M10 10 L22 24 L34 10"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 28 L22 42 L34 28"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </button>
  );
};

const RootLayoutInner = ({ children }) => {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const openRef = useRef();
  const closeRef = useRef();
  const navRef = useRef();
  const blueCardRef = useRef(null);
  const citiesRef = useRef(null);
  const animatingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Block manual downward scroll once the user has reached the bottom of
  // the blue card (the "stop" point). Only the arrow-click animation is
  // allowed to pass through. We block at every layer (wheel, touch, keys,
  // scrollbar) and also clamp the scroll position as a hard backstop.
  useEffect(() => {
    // Compute the maximum allowed scrollY (where the snap-end stop sits).
    const maxScrollY = () => {
      const blue = blueCardRef.current;
      if (!blue) return Infinity;
      const blueBottom = blue.offsetTop + blue.offsetHeight;
      // 80px matches scrollMarginBottom: blue.bottom should sit 80px above
      // viewport bottom when at the stop, i.e. scrollY = blueBottom - vh + 80.
      return blueBottom - window.innerHeight + 80;
    };

    const isLocked = () => !animatingRef.current && !expanded;

    // Proactive clamp: if the wheel delta would take us past the stop,
    // cancel the event AND synchronously move only the allowed amount.
    // We bypass `scroll-behavior: smooth` by writing scrollTop directly so
    // these clamp scrolls are instantaneous and don't stack into a shake.
    const onWheel = (e) => {
      if (!isLocked()) return;
      if (e.deltaY <= 0) return;
      const max = maxScrollY();
      const remaining = max - window.scrollY;
      if (remaining <= 0) {
        e.preventDefault();
        return;
      }
      if (e.deltaY > remaining) {
        e.preventDefault();
        document.documentElement.scrollTop = window.scrollY + remaining;
      }
    };

    let touchStartY = 0;
    let lastTouchY = 0;
    const onTouchStart = (e) => {
      const y = e.touches[0]?.clientY ?? 0;
      touchStartY = y;
      lastTouchY = y;
    };
    const onTouchMove = (e) => {
      if (!isLocked()) return;
      const y = e.touches[0]?.clientY ?? 0;
      const dy = lastTouchY - y;
      lastTouchY = y;
      if (dy <= 0) return;
      const max = maxScrollY();
      const remaining = max - window.scrollY;
      if (remaining <= 0) {
        e.preventDefault();
        return;
      }
      if (dy > remaining) {
        e.preventDefault();
        document.documentElement.scrollTop = window.scrollY + remaining;
      }
    };

    const blockedKeys = new Set([
      "ArrowDown",
      "PageDown",
      "End",
      " ",
      "Spacebar",
    ]);
    const onKeyDown = (e) => {
      if (!isLocked()) return;
      if (blockedKeys.has(e.key) && window.scrollY >= maxScrollY() - 4) {
        e.preventDefault();
      }
    };

    // Hard, instant backstop: only triggers if something escapes the
    // proactive clamp (e.g., keyboard). Direct scrollTop write so it's
    // instant and doesn't stack with `scroll-behavior: smooth`.
    const onScroll = () => {
      if (!isLocked()) return;
      const max = maxScrollY();
      if (window.scrollY > max) {
        document.documentElement.scrollTop = max;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [expanded]);

  // Click the arrow → release the gate, native smooth scroll to cities,
  // then restore lock.
  const scrollToCities = () => {
    const cities = citiesRef.current;
    if (!cities) return;
    animatingRef.current = true;
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    html.style.scrollSnapType = "none";
    // Leave only a slim strip (~1/10 vh) of the blue page above cities.
    const targetY =
      cities.getBoundingClientRect().top + window.scrollY -
      window.innerHeight / 10;
    window.scrollTo({ top: targetY, behavior: "smooth" });
    window.setTimeout(() => {
      html.style.scrollSnapType = prevSnap;
      animatingRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    function onClick(event) {
      if (event.target.closest("a")?.href === window.location.href) {
        setExpanded(false);
      }
    }
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  // Disable scroll-snap while the dropdown is expanding so the browser
  // doesn't snap the page back to the blue card and hide the menu.
  useEffect(() => {
    const html = document.documentElement;
    if (expanded) {
      html.style.scrollSnapType = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // restore after the close animation finishes
      const t = window.setTimeout(() => {
        html.style.scrollSnapType = "";
      }, 1200);
      return () => window.clearTimeout(t);
    }
  }, [expanded]);
  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          aria-hidden={expanded ? "true" : undefined}
          inert={expanded ? "" : undefined}
        >
          {/* Header */}
          <Header
            panelId={panelId}
            icon={HiMenuAlt4}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded);
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true })
              );
            }}
          />
        </div>
        <motion.div
          layout
          id={panelId}
          initial={false}
          animate={{
            backgroundColor: expanded
              ? "rgba(255, 210, 23, 1)"
              : "rgba(255, 210, 23, 0)",
          }}
          style={{ height: expanded ? "auto" : "0.5rem" }}
          className="relative z-50 overflow-hidden pt-2"
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            backgroundColor: {
              duration: 0.01,
              delay: expanded ? 0 : 1.1,
            },
          }}
          aria-hidden={expanded ? undefined : "true"}
          inert={expanded ? undefined : ""}
        >
          <motion.div
            layout
            style={{ backgroundColor: "rgb(255, 210, 23)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={navRef}
              className="pb-16 pt-14"
              style={{ backgroundColor: "rgb(255, 210, 23)" }}
            >
              <Header
                invert
                panelId={panelId}
                icon={IoMdClose}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded);
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true })
                  );
                }}
              />
            </div>

            <ArticlesNavigation />
          </motion.div>
        </motion.div>
      </header>
      <motion.div
        layout
        className="relative flex flex-col"
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={blueCardRef}
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            backgroundColor: "rgb(0, 46, 255)",
            minHeight: "calc(100vh - 3.5rem)",
          }}
          className="relative flex w-full flex-col overflow-hidden pt-14"
        >
          <div className="relative isolate flex w-full flex-auto flex-col pt-9">
            <main className="w-full flex-auto">{children}</main>
          </div>
          <ScrollHint onClick={scrollToCities} />
        </div>
        <div
          ref={citiesRef}
          style={{
            backgroundColor: "rgb(255, 210, 23)",
            minHeight: "80vh",
          }}
          className="w-full"
        >
          <CitiesPage />
        </div>
      </motion.div>
    </MotionConfig>
  );
};

const RootLayout = ({ children }) => {
  const pathName = usePathname();
  return <RootLayoutInner key={pathName}>{children}</RootLayoutInner>;
};

export default RootLayout;
