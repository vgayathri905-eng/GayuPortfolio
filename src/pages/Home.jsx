import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loader from "../components/layout/Loader";
import ScrollProgress from "../components/layout/ScrollProgress";
import CursorGlow from "../components/layout/CursorGlow";
import BackToTop from "../components/layout/BackToTop";
import AnimatedBackground from "../components/layout/AnimatedBackground";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Certificates from "../components/sections/Certificates";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

function Home() {
  return (
    <>
      {/* Loader */}
      <Loader />

      {/* Background / Effects */}
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />

      {/* Main Portfolio */}
      <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
        <Navbar />

        <Hero />

        <About />

        <Experience />

        <Education />

        <Skills />

        <Projects />

        <Certificates />

        <Services />

        <Contact />

        <Footer />

        <BackToTop />
      </main>
    </>
  );
}

export default Home;