import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { MdOutlineArrowDownward } from "react-icons/md";
import profile from "../../data/profile";
import Container from "../common/Container";
import PrimaryButton from "../common/PrimaryButton";
import SocialLinks from "../common/SocialLinks";

function Hero() {
  // Left side dynamic reveal setup
  const leftSideVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Right side floating cards container
  const rightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const dynamicCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Continuous micro-floating loop setup for background card layers
  const floatAnimation = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Block */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.span
              variants={leftSideVariants}
              className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300"
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1
              variants={leftSideVariants}
              className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </motion.h1>

            <motion.h2
              variants={leftSideVariants}
              className="mt-5 text-2xl font-semibold text-slate-200 md:text-3xl"
            >
              {profile.role}
            </motion.h2>

            <motion.p
              variants={leftSideVariants}
              className="mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              variants={leftSideVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <PrimaryButton href={profile.resume} download>
                <FaDownload />
                Download Resume
              </PrimaryButton>

              <PrimaryButton href="#contact" variant="outline">
                Contact Me
              </PrimaryButton>
            </motion.div>

            <motion.div variants={leftSideVariants}>
              <SocialLinks
                github={profile.github}
                linkedin={profile.linkedin}
                email={profile.email}
                className="mt-10"
              />
            </motion.div>
          </motion.div>

          {/* Right Block */}
          <div className="relative">
            {/* Pulsing ambient glowing background circle */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
            ></motion.div>

            <motion.div
              variants={rightContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-5 sm:grid-cols-2"
            >
              {/* Card 1 */}
              <motion.div
                variants={dynamicCardVariants}
                {...floatAnimation}
                whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.3, ease: "easeOut" } }}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-500/40"
              >
                <p className="text-sm text-slate-400">Role</p>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  MERN Stack
                </h3>
                <p className="mt-2 text-slate-400">Full Stack Developer</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                variants={dynamicCardVariants}
                {...floatAnimation}
                transition={{ ...floatAnimation.transition, delay: 0.5 }}
                whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.3, ease: "easeOut" } }}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/40"
              >
                <p className="text-sm text-slate-400">Experience</p>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  Fresher
                </h3>
                <p className="mt-2 text-slate-400">Hands-on project builder</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={dynamicCardVariants}
                {...floatAnimation}
                transition={{ ...floatAnimation.transition, delay: 0.2 }}
                whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.3, ease: "easeOut" } }}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-purple-500/40"
              >
                <p className="text-sm text-slate-400">Projects</p>
                <h3 className="mt-3 text-2xl font-bold text-white">3+</h3>
                <p className="mt-2 text-slate-400">Responsive web projects</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                variants={dynamicCardVariants}
                {...floatAnimation}
                transition={{ ...floatAnimation.transition, delay: 0.7 }}
                whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.3, ease: "easeOut" } }}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-500/40"
              >
                <p className="text-sm text-slate-400">Training</p>
                <h3 className="mt-3 text-2xl font-bold text-white">AITECH</h3>
                <p className="mt-2 text-slate-400">MERN Stack Trainee</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll Tracker Action */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-sm tracking-wider opacity-80">Scroll</span>
        <div className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-cyan-400 p-2">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MdOutlineArrowDownward className="text-cyan-400 text-lg" />
          </motion.div>
        </div>
      </motion.a>
    </section>
  );
}

export default Hero;