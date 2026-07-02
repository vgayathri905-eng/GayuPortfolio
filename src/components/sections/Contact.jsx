import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import profile from "../../data/profile";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import SocialLinks from "../common/SocialLinks";

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Contact"
          subtitle="Let's connect if you have an opportunity, project idea or collaboration in mind."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold text-white">
              Contact Information
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-slate-400">{profile.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-slate-400">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-semibold text-white">Location</p>
                  <p className="text-slate-400">{profile.location}</p>
                </div>
              </div>
            </div>

            <SocialLinks
              github={profile.github}
              linkedin={profile.linkedin}
              email={profile.email}
              className="mt-8"
            />
          </motion.div>

          {/* Right */}
          <motion.form
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold text-white">
              Send a Message
            </h3>

            <div className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              ></textarea>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-cyan-600 hover:shadow-[0_12px_30px_rgba(34,211,238,0.25)]"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

export default Contact;