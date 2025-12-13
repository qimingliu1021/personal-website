"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
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
            src={!expanded ? QimingBlack : Qiming}
            alt="Qiming Logo"
            width={120}
            height={40}
          />
        </Link>

        <div className="sm:border-l sm:border-transparent sm:pl-16">
          <h2 className="font-display text-base font-semibold text-white">
            Stay in touch
          </h2>
          <SocialMedia className="mt-6" invert />
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
              "group -m-2.5 rounded-full p-2.5 transition",
              invert ? "hover:bg-white/10" : "hover:bg-neutral-950/10"
            )}
            aria-label="Toggle navigation"
          >
            <Icon
              className={clsx(
                "h-6 w-6",
                invert
                  ? "fill-white group-hover:fill-neutral-200"
                  : "fill-neutral-950 group-hover:fill-neutral-700"
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  );
};

const ArticlesNavigation = () => {
  return (
    <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
      <div className="max-w-6xl mx-auto py-4 px-4">
        <div className="flex flex-col gap-4">
          <Link href="#" className="text-xl text-white">
            {"I never thought I'd do startups"}
          </Link>
          <Link href="#" className="text-xl text-white">
            I Ching
          </Link>
          <Link href="#" className="text-xl text-white">
            I hate CS, I thank CS
          </Link>
          <Link href="#" className="text-xl text-white">
            The matches
          </Link>
          <Link href="#" className="text-xl text-white">
            Toxic motivation - Hate and Anxiety
          </Link>
        </div>
      </div>
    </div>
  );
};

const RootLayoutInner = ({ children }) => {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const openRef = useRef();
  const closeRef = useRef();
  const navRef = useRef();
  const shouldReduceMotion = useReducedMotion();
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
          style={{ height: expanded ? "auto" : "0.5rem" }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={expanded ? undefined : "true"}
          inert={expanded ? undefined : ""}
        >
          <motion.div layout className="bg-neutral-800">
            <div ref={navRef} className="bg-neutral-950 pb-16 pt-14">
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
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <main className="w-full flex-auto">{children}</main>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

const RootLayout = ({ children }) => {
  const pathName = usePathname();
  return <RootLayoutInner key={pathName}>{children}</RootLayoutInner>;
};

export default RootLayout;
