import { Button, Heading } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Heading>Lorem ipsum dolor sit.</Heading>
      <Button>Add to Cart</Button>
      <Button tone="outline-1" size="lg">
        Add to Cart
      </Button>
      <Button tone="outline-2" size="sm">
        Add to Cart
      </Button>
      <Button variant="secondary" tone="outline-1" size="sm">
        Add to Cart
      </Button>
      <Button variant="primary" tone="link" size="sm" weight="bold">
        Add to Cart
      </Button>
    </>
  );
}
