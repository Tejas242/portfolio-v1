"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";

const navLink = [
  { title: "Home", href: "/" },
  { title: "Home", href: "/" },
  { title: "Home", href: "/" },
  { title: "Home", href: "/" },
];

const Navbar = () => {
  const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 9.5L24 9.5" },
  };

  const path02Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: "M0 14.5L24 14.5" },
    closed: { d: "M0 14.5L15 14.5" },
  };

  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
    // start animation
    if (!open) {
      path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
    }
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: [0.12, 0, 0.39, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };
  
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    const previous = scrollY.getPrevious();

    if (latestScrollY > previous && latestScrollY > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <header className="sticky top-0 ">
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex justify-between items-center py-8 lg:pt-10 px-10"
      >
        <div className="flex items-center gap-[1ch]">
          <div className={`w-5 h-5 ${open ? 'bg-background' : 'bg-primary'} transition-colors duration-700 rounded-full z-10`}>
            <span className="text-sm font-semibold tracking-widest">
              PORTFOLIO
            </span>
          </div>
        </div>

        {/* <div
          className="cursor-pointer text-md text-secondary"
          onClick={toggleMenu}
        >
          Menu
        </div> */}
        <button
          className="z-10 cursor-pointer text-secondary"
          onClick={toggleMenu}
        >
          <svg width="36" height="36" viewBox="0 0 24 24">
            <motion.path
              {...path01Variants.closed}
              animate={path01Controls}
              transition={{ duration: 0.2 }}
              className={"stroke-current stroke-2 text-secondary"}
            />
            <motion.path
              {...path02Variants.closed}
              animate={path02Controls}
              transition={{ duration: 0.2 }}
              className={"stroke-current stroke-2 text-secondary"}
            />
          </svg>
        </button>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-primary text-secondary p-10"
          >
            <div className="flex h-full flex-col">
              {/* <div className="flex justify-between">
                <div className="w-5 h-5 bg-white rounded-full opacity-0">
                  <span className="text-sm font-semibold tracking-widest">
                    PORTFOLIO
                  </span>
                </div>
                <p
                  className="cursor-pointer text-md text-secondary"
                  onClick={toggleMenu}
                >
                  Close
                </p>
              </div> */}
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4"
              >
                {navLink.map((link, index) => {
                  return (
                    <div className="overflow-hidden">
                      <MobileNavLink
                        key={index}
                        title={link.title}
                        href={link.href}
                      ></MobileNavLink>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};
const MobileNavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-4xl uppercase font-bold text-secondary hover:text-background cursor-pointer hover:transition hover:duration-300"
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
