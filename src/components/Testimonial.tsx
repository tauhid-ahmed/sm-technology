import Badge from "./Badge";
import Container from "./Container";
import Heading from "./Heading";
import Section from "./Section";
import Image from "next/image";
import testimonial from "@/assets/testimonial.png";
import { cn } from "@/lib/utils";

const customerTestimonials = [
  {
    id: 1,
    authorImage: testimonial,
    message:
      "I absolutely love Fresh Harvest! The quality of their produce is outstanding. It's always fresh, flavorful, and delicious. The convenience of ordering online and having it delivered to my doorstep saves me so much time. Fresh Harvest has become my go-to for all my fruit and vegetable needs.",
    customerName: "Jane Doe",
    customerTitle: "Professional Chef",
  },
];

export default function Testimonial() {
  return (
    <Section className="py-16 lg:py-[7.5rem]">
      <div className="text-center space-y-4 tracking-tight max-w-[37rem] mx-auto px-4">
        <Badge>Testimonial</Badge>
        <Heading className="tracking-tight" as="h2" size="h2" weight="medium">
          What Our Customers Say
        </Heading>
        <p className="text-sm">
          Don&apos;t just take our word for it—here&apos;s what some of our
          customers have to say about their experience with Fresh Harvest:
        </p>
      </div>
      <Container size="sm" className="mt-6 lg:mt-10 space-y-6">
        {customerTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="space-y-3 flex flex-col md:flex-row gap-10 lg:gap-20 items-center"
          >
            <Image
              className="max-w-84"
              src={testimonial.authorImage}
              alt={testimonial.customerTitle}
            />
            <figure className="flex-1 bg-color-gray-20 p-8 rounded-lg">
              <blockquote className="text-color-gray-100 text-body-2 text-[1.25rem] leading-relaxed">
                {testimonial.message}
              </blockquote>
              <figcaption className="text-color-gray-100 text-body-2 mt-4 lg:mt-8">
                <span className="font-rubik font-semibold">
                  {testimonial.customerName}
                </span>{" "}
                - {testimonial.customerTitle}
              </figcaption>
            </figure>
          </div>
        ))}
        <div className="flex justify-center gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "block size-4 rounded-full bg-color-gray-80 cursor-pointer",
                index === 0 && "bg-color-green"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
