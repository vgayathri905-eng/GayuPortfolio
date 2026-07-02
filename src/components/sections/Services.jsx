import { motion } from "framer-motion";
import { FaLaptopCode, FaServer, FaMobileAlt } from "react-icons/fa";
import services from "../../data/services";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const icons = [<FaLaptopCode />, <FaServer />, <FaMobileAlt />];

function Services() {
  // Stagger arrangement matrix
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Modern 3D spatial presentation variants
  const serviceCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 55,
      scale: 0.93,
      rotateX: 15,
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
        stiffness: 85,
        damping: 14,
        duration: 0.7
      },
    },
  };

  return (
    <section id="services" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Services"
          subtitle="The type of development work and solutions I can offer."
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ perspective: 1000 }} // Sets up 3D coordinate space environment
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={serviceCardVariants}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                rotateX: -4,
                rotateY: 4,
                z: 10,
                borderColor: "rgba(34, 211, 238, 0.5)", // cyan-400
                boxShadow: "0 22px 45px -10px rgba(34, 211, 238, 0.15)"
              }}
              style={{ transformStyle: "preserve-3d" }} // Encourages child components to render on their own Z-planes
              className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-xl transition-all duration-300 ease-out"
            >
              {/* Animated Floating Icon Container Layer */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transform: "translateZ(30px)" }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-3xl text-cyan-400 border border-cyan-500/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/20 transition-all duration-300"
              >
                {icons[index % icons.length]}
              </motion.div>

              <h3 
                style={{ transform: "translateZ(20px)" }}
                className="mt-6 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300"
              >
                {service.title}
              </h3>

              <p 
                style={{ transform: "translateZ(15px)" }}
                className="mt-4 leading-8 text-slate-400"
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Services;