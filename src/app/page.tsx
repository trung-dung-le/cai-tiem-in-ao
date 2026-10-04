import { Benefits } from "@/components/Benefits";
import { BusinessContact } from "@/components/BusinessContact";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Products } from "@/components/Products";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Services />
        <Products />
        <Process />
        <Testimonials />
        <Cta />
        <BusinessContact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
