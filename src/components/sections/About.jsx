import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import profile from "../../data/profile";
import education from "../../data/education";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function About() {
  const degree = education[0]?.degree || "Bachelor Degree";

  const infoCards = [
    {
      icon: <FaGraduationCap />,
      title: "Degree",
      value: degree,
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      value: profile.phone,
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: profile.email,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: profile.location,
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="About Me"
          subtitle="A quick introduction about my background, skills and passion for web development."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl"
          >
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              MERN Stack Developer
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-400 md:text-lg">
              I am a passionate MERN Stack Developer with a strong interest in
              creating modern, responsive and user-friendly web applications.
              I enjoy building attractive interfaces, clean backend logic and
              scalable web solutions using the MERN stack.
            </p>

            <p className="mt-6 text-base leading-8 text-slate-400 md:text-lg">
              I completed my{" "}
              <span className="font-semibold text-cyan-400">
                Bachelor of Commerce (Computer Applications)
              </span>{" "}
              and also underwent practical MERN Stack training at{" "}
              <span className="font-semibold text-cyan-400">
                AITECH Academy
              </span>
              . I am focused on improving my technical skills and building
              real-world projects that deliver a great user experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {infoCards.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_12px_30px_rgba(34,211,238,0.18)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-400">
                  {item.icon}
                </div>

                <h4 className="mt-5 text-lg font-semibold text-white">
                  {item.title}
                </h4>

                <p className="mt-3 leading-7 text-slate-400">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default About;