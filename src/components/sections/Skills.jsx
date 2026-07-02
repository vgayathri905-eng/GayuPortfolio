import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaGraduationCap 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiExpress, SiMongodb, SiFirebase, SiVite, SiPostman, SiTypescript 
} from "react-icons/si";
import skills from "../../data/skills";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

// Title components dynamic mapping setup
const iconMap = {
  "html": <FaHtml5 className="text-[#E34F26]" />,
  "html5": <FaHtml5 className="text-[#E34F26]" />,
  "css": <FaCss3Alt className="text-[#1572B6]" />,
  "css3": <FaCss3Alt className="text-[#1572B6]" />,
  "javascript": <FaJs className="text-[#F7DF1E]" />,
  "js": <FaJs className="text-[#F7DF1E]" />,
  "typescript": <SiTypescript className="text-[#3178C6]" />,
  "ts": <SiTypescript className="text-[#3178C6]" />,
  "react": <FaReact className="text-[#61DAFB]" />,
  "react js": <FaReact className="text-[#61DAFB]" />,
  "react.js": <FaReact className="text-[#61DAFB]" />,
  "tailwind": <SiTailwindcss className="text-[#06B6D4]" />,
  "tailwind css": <SiTailwindcss className="text-[#06B6D4]" />,
  "node": <FaNodeJs className="text-[#339933]" />,
  "node js": <FaNodeJs className="text-[#339933]" />,
  "node.js": <FaNodeJs className="text-[#339933]" />,
  "express": <SiExpress className="text-white" />,
  "express js": <SiExpress className="text-white" />,
  "express.js": <SiExpress className="text-white" />,
  "mongodb": <SiMongodb className="text-[#47A248]" />,
  "mongo db": <SiMongodb className="text-[#47A248]" />,
  "firebase": <SiFirebase className="text-[#FFCA28]" />,
  "git": <FaGitAlt className="text-[#F05032]" />,
  "vite": <SiVite className="text-[#646CFF]" />,
  "postman": <SiPostman className="text-[#FF6C37]" />,
  "sql": <FaDatabase className="text-[#4479A1]" />
};

function Skills() {
  // Stagger structure for grid elements
  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  // High-end spring pop transition matrix
  const individualCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 45, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 110, 
        damping: 14 
      }
    }
  };

  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I use to build modern web applications."
        />

        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {skills.map((skill, index) => {
            const skillKey = skill.title?.toLowerCase().trim();
            const skillIcon = iconMap[skillKey] || <FaGraduationCap className="text-cyan-400" />;

            return (
              <motion.div
                key={index}
                variants={individualCardVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 400, damping: 18 }
                }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_15px_35px_rgba(34,211,238,0.16)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-cyan-400/80 group-hover:text-cyan-400 transition-colors">
                      {skill.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      {skill.title}
                    </h3>
                  </div>
                  
                  {/* Icon spring loop container */}
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 text-2xl group-hover:border-cyan-500/30 group-hover:bg-slate-950 transition-all duration-300"
                  >
                    {skillIcon}
                  </motion.div>
                </div>
                
                <p className="mt-4 text-sm text-slate-400 font-medium bg-slate-950/40 inline-block px-3 py-1 rounded-xl border border-slate-800/60">
                  {skill.level}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default Skills;