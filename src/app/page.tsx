import {
  AboutUs,
  OurBlog,
  OurProducts,
  PromotionalBanner,
  Testimonial,
} from "@/components/home";
import Hero from "@/components/home/Hero";

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
