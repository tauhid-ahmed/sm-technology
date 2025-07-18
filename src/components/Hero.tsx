import Badge from "./Badge";
import Button from "./Button";
import Container from "./Container";
import Heading from "./Heading";
import Section from "./Section";
import Image from "next/image";
import girlImage from "@/assets/girl.png";
import offerImage from "@/assets/offerImage.png";
import Link from "next/link";
import playStoreLogo from "@/assets/playStore.png";
import appStoreLogo from "@/assets/appStore.png";

export default function Hero() {
  return (
    <Section
      id="home"
      className="min-h-screen py-36 lg:py-44 -mt-[6.25rem] [background:linear-gradient(to_right,_#f4f6f6_69%,_#749b3f_31%)] z-10"
    >
      <Image
        src={girlImage}
        alt="Girl"
        className="absolute bottom-0 left-[54.5%] size-full max-w-[40rem] h-auto object-contain -z-10"
      />

      <Container>
        <div className="max-w-2xl space-y-6">
          <Badge>Welcome to Fresh Harvest</Badge>
          <Heading className="tracking-tight" as="h1" size="h1" weight="medium">
            Fresh Fruits and Vegetables
          </Heading>
          <p>
            At Fresh Harvests, we are passionate about providing you with the
            freshest and most flavorful fruits and vegetables
          </p>
          <Button>Shop Now</Button>
          <Image
            src={offerImage}
            alt="offer"
            className="max-w-lg -translate-x-1/4 md:translate-x-1/4 w-full block h-auto"
          />
          <div className="mt-6">
            <Heading as="h3" size="h6" weight="medium" className="text-sm!">
              Download App:
            </Heading>
            <div className="flex space-x-4 mt-3">
              <Link href="#" prefetch={false} className="block">
                <Image
                  src={playStoreLogo}
                  alt="Google Play"
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="#" prefetch={false} className="block">
                <Image
                  src={appStoreLogo}
                  alt="App Store"
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
