"use client";

import Section from "./Section";
import Container from "./Container";
import Badge from "./Badge";
import Heading from "./Heading";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function PromotionalBanner() {
  const targetDate = new Date(
    Date.now() + (3 * 24 * 60 * 60 + 18 * 60 * 60 + 55 * 60) * 1000
  );
  return (
    <Section className="py-16 lg:py-32">
      <div className="bg-color-gray-80/20">
        <Container>
          <div className="flex-1 space-y-8 min-h-96 z-10 relative py-[5.625rem]">
            <Badge>Special Offer</Badge>
            <Heading
              className="tracking-tight text-color-black"
              as="h2"
              size="h1"
              weight="medium"
            >
              Seasonal Fruit Bundle
            </Heading>
            <Heading
              as="h3"
              size="h2"
              weight="medium"
              className="text-color-black"
            >
              Discount up to <span className="text-color-primary">80% OFF</span>
            </Heading>
            <CountdownTimer targetDate={targetDate} />
            <span className="rounded-full inline-block px-8 py-4 bg-[#186D38] text-color-gray-20 font-rubik font-bold text-3xl">
              CODE: <span className="text-[#FAC712]">FRESH80</span>
            </span>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="flex items-center gap-4 text-2xl font-rubik text-color-black">
      <div className="bg-white h-[7.625rem] w-[6.125rem] flex flex-col items-center justify-center rounded-xl space-y-2">
        <div className="text-[1.75rem] font-normal md:text-[2.5rem]">
          {pad(days)}
        </div>
        <div className="text-xs md:text-sm text-gray-600 text-[1.125rem]">
          Days
        </div>
      </div>
      <div className="bg-white h-[7.625rem] w-[6.125rem] flex flex-col items-center justify-center rounded-xl space-y-2">
        <div className="text-[1.75rem] font-normal md:text-[2.5rem]">
          {pad(hours)}
        </div>
        <div className="text-xs md:text-sm text-gray-600 text-[1.125rem]">
          Hour
        </div>
      </div>
      <div className="bg-white h-[7.625rem] w-[6.125rem] flex flex-col items-center justify-center rounded-xl space-y-2">
        <div className="text-[1.75rem] font-normal md:text-[2.5rem]">
          {pad(minutes)}
        </div>
        <div className="text-xs md:text-sm text-gray-600 text-[1.125rem]">
          Min
        </div>
      </div>
      <div className="bg-white h-[7.625rem] w-[6.125rem] flex flex-col items-center justify-center rounded-xl space-y-2">
        <div className="text-[1.75rem] font-normal md:text-[2.5rem]">
          {pad(seconds)}
        </div>
        <div className="text-xs md:text-sm text-gray-600 text-[1.125rem]">
          Second
        </div>
      </div>
    </div>
  );
}
