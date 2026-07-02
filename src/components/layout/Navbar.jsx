import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../../data/profile";
import Container from "../common/Container";
import PrimaryButton from "../common/PrimaryButton";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global handle event for scrolling link elements straight to top layer
  const handleLinkClick = (e, href) => {
    if (href === "#hero") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  // Mobile menu drop animation variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0, y: -15 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      y: -15,
      transition: { duration: 0.25, ease: "easeIn" }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="text-2xl font-black tracking-wide text-white"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </a>

        {/* Desktop */}
        <nav className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden xl:block">
          <PrimaryButton href={profile.resume} download>
            Resume
          </PrimaryButton>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden text-3xl text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </Container>

      {/* Mobile Menu Layer with AnimatePresence support */}
      <AnimatePresence>
        {open && (
          <motion.div 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-slate-800 bg-slate-950/95 xl:hidden overflow-hidden"
          >
            <Container className="py-6">
              <ul className="flex flex-col gap-5">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="block text-base font-medium text-slate-300 transition hover:text-cyan-400"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <PrimaryButton href={profile.resume} download className="w-full">
                  Resume
                </PrimaryButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;