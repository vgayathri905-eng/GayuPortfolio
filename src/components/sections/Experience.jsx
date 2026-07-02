import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import experience from "../../data/experience";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Experience"
          subtitle="My training journey and practical experience in MERN Stack development."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 hidden h-full w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 md:block"></div>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl md:ml-12"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[54px] top-10 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-slate-950 bg-cyan-400 md:flex">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-950"></div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
                      <FaBriefcase className="text-cyan-400" />
                      {item.role}
                    </h3>

                    <p className="mt-3 text-lg font-semibold text-cyan-400">
                      {item.company}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-slate-400">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-cyan-400" />
                      {item.duration}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-cyan-400" />
                      {item.location}
                    </p>
                  </div>
                </div>

                <p className="mt-6 leading-8 text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Experience;