
import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import ProductShowcase from "../components/ProductShowcase/ProductShowcase";
import GetPrice from "../components/GetPrice/GetPrice";
import Categories from "../components/Categories/Categories.jsx";
import Services from "../components/Services/Services.jsx";
import Projects from "../components/Projects/Projects.jsx";
import Products from "../components/Products/Products.jsx";
import Fabrication from "../components/Fabrication/Fabrication.jsx";
import WhyChoose from "../components/WhyChoose/WhyChoose.jsx";
import CTA from "../components/CTA/CTA.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function Home() {
  return (
    <>
    <Navbar />
<Hero />

<ProductShowcase/>

<Services />

<Products />
<Fabrication />
<WhyChoose />
<GetPrice />
<CTA />
<Footer />
    </>
  );
}