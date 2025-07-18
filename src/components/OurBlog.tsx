import Badge from "./Badge";
import Container from "./Container";
import Heading from "./Heading";
import Section from "./Section";
import Image from "next/image";
import Link from "next/link";
import blog1 from "@/assets/blog-01.png";
import blog2 from "@/assets/blog-02.png";
import blog3 from "@/assets/blog-03.png";
import leafIcon from "@/assets/leaf.png";

const data = [
  {
    id: 1,
    img: blog1,
    title: "Exploring Seasonal Delights: A Guide to What's Fresh Right Now",
    createdAt: "May 23, 2024",
    href: "#",
  },
  {
    id: 2,
    img: blog2,
    title:
      "Mastering Salad Creations: Tips and Tricks for Building Delicious and Nutritious Salads",
    createdAt: "May 23, 2024",
    href: "#",
  },
  {
    id: 3,
    img: blog3,
    title:
      "The Art of Meal Prepping: How to Save Time and Eat Healthy Throughout the Week",
    createdAt: "May 23, 2024",
    href: "#",
  },
];

export default function OurBlog() {
  return (
    <Section id="blog" className="py-16 lg:py-[7.5rem]">
      <Container size="xs" className="text-center space-y-4 relative">
        <Image
          src={leafIcon}
          alt="Leaf"
          className="absolute top-1/4 left-full translate-x-[200%] w-16 -rotate-45"
        />
        <Badge>Blog</Badge>
        <Heading className="tracking-tight" as="h2" size="h2">
          Fresh Harvest Blog
        </Heading>
        <p className="text-sm">
          Welcome to the Fresh Harvest Blog, your go-to resource for all things
          related to fresh produce, healthy eating, and culinary inspiration.
        </p>
      </Container>
      <Container className="mt-6 lg:mt-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-6">
          {data.map((blog) => (
            <div key={blog.id} className="space-y-3">
              <Image src={blog.img} alt="Blog" />
              <span className="text-color-gray-100 text-body-2 block mt-2">
                {blog.createdAt}
              </span>
              <Heading as="h3" size="h6" weight="bold" className="leading-snug">
                {blog.title}
              </Heading>
              <Link
                className="text-color-primary font-rubik font-medium text-sm flex gap-2 mt-4 hover:underline"
                href={blog.href}
              >
                Read More <span>&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
