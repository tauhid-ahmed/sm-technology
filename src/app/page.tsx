import {
  AboutUs,
  OurBlog,
  OurProducts,
  PromotionalBanner,
  Testimonial,
} from "@/components";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <OurProducts />
      <AboutUs />
      <PromotionalBanner />
      <Testimonial />
      <OurBlog />
    </>
  );
}
