import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Services from "../components/Services/Services.jsx";
import Projects from "../components/Projects/Projects.jsx";
import WhyChoose from "../components/WhyChoose/WhyChoose.jsx";
import CTA from "../components/CTA/CTA.jsx";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyChoose />
      <CTA />
    </>
  );
}