import { motion } from "framer-motion";
import { FaCertificate, FaAward, FaCalendarAlt } from "react-icons/fa";
import certificates from "../../data/certificates";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function Certificates() {
  return (
    <section id="certificates" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Certificates"
          subtitle="Training programs and certifications that support my learning journey."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_12px_30px_rgba(34,211,238,0.18)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-3xl text-cyan-400">
                <FaCertificate />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-4 flex items-center gap-2 text-cyan-400">
                <FaAward />
                {item.organization}
              </p>

              <p className="mt-3 flex items-center gap-2 text-slate-400">
                <FaCalendarAlt />
                {item.year}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Certificates;