import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import projects from "../../data/projects";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import PrimaryButton from "../common/PrimaryButton";

function Projects() {
  // Stagger entry setup for structural cards grid container
  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // High-performance vertical entrance sequence
  const projectCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 65,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        duration: 0.75,
      },
    },
  };

  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Projects"
          subtitle="A collection of projects showcasing my practical MERN stack and frontend development skills."
        />

        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectCardVariants}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_20px_45px_rgba(34,211,238,0.16)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>

                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-white transition hover:border-cyan-400 hover:bg-cyan-500"
                  >
                    <FaExternalLinkAlt />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-white transition hover:border-cyan-400 hover:bg-cyan-500"
                  >
                    <FaGithub />
                  </motion.a>
                </div>
              </div>

              <p className="mt-5 leading-8 text-slate-400">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, border: "1px solid rgba(34,211,238,0.5)" }}
                    className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </PrimaryButton>

                <PrimaryButton
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                >
                  GitHub
                </PrimaryButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Projects;