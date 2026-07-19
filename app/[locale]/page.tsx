import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Practice } from "@/components/sections/Practice";
import { WhyUs } from "@/components/sections/WhyUs";
import { Method } from "@/components/sections/Method";
import { Stats } from "@/components/sections/Stats";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Practice />
      <WhyUs />
      <Stats />
      <Method />
      <FAQPreview />
      <BlogPreview />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
