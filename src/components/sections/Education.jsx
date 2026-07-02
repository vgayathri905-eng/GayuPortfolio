import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import education from "../../data/education";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  // High-end 3D Spatial rotation and spring drop variants
  const card3DVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.92,
      rotateX: 20, 
      rotateY: -10 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 14,
      },
    },
  };

  return (
    <section id="education" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Education"
          subtitle="My academic qualification and educational background."
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-5xl space-y-8"
          style={{ perspective: 1200 }} // Sets up the global 3D space matrix
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={card3DVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.015,
                rotateX: -3,
                rotateY: 2,
                z: 15,
                borderColor: "rgba(34, 211, 238, 0.6)", // cyan-400
                boxShadow: "0 25px 50px -12px rgba(34, 211, 238, 0.25)"
              }}
              style={{ transformStyle: "preserve-3d" }} // Forces components to render on independent 3D planes
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 ease-out"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                {/* Left block with translation layer for deep spatial parallax effect */}
                <div style={{ transform: "translateZ(30px)" }}>
                  <h3 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
                    <motion.div
                      initial={{ scale: 0, rotate: -35 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 150 }}
                      viewport={{ once: true }}
                    >
                      <FaGraduationCap className="text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    </motion.div>
                    {item.degree}
                  </h3>

                  <p className="mt-5 flex items-center gap-3 text-lg font-semibold text-cyan-400">
                    <FaUniversity />
                    {item.college}
                  </p>
                </div>

                {/* Right metadata content layer */}
                <div 
                  style={{ transform: "translateZ(20px)" }}
                  className="space-y-3 text-slate-400"
                >
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-cyan-400" />
                    {item.duration}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    {item.location}
                  </p>

                  <p className="font-semibold text-white bg-slate-950/40 inline-block px-4 py-1.5 rounded-xl border border-slate-800/80">
                    {item.cgpa}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Education;