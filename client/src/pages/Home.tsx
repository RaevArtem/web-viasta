import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ProductCatalog from "@/components/ProductCatalog";
import ProductComparison from "@/components/ProductComparison";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Consultation from "@/components/Consultation";
import FAQ from "@/components/FAQ";
import Contacts from "@/components/Contacts";

const Home = () => {
  return (
    <div>
      <Hero />
      <Benefits />
      <ProductCatalog />
      <ProductComparison />
      <AboutUs />
      <Services />
      <Testimonials />
      <Consultation />
      <FAQ />
      <Contacts />
    </div>
  );
};

export default Home;
