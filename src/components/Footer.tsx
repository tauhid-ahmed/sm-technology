import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Container from "./shared/Container";
import Heading from "./shared/Heading";

import logo from "@/assets/logo.png";
import playStoreLogo from "@/assets/playStore.png";
import appStoreLogo from "@/assets/appStore.png";
import gPay from "@/assets/gpay.png";
import visa from "@/assets/visa.png";
import paypal from "@/assets/paypal.png";
import x from "@/assets/x.png";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";

// Quick Links Data
const quickLinkSections = [
  {
    title: "Quick links 1",
    links: ["Home", "Shop", "About us", "Blog", "Detail Blog"],
  },
  {
    title: "Quick links 2",
    links: ["Favorites", "Cart", "Sign in", "Register"],
  },
];

// Contact Info Data
const contactInfo = [
  { icon: Phone, label: "1234 5678 90" },
  { icon: Mail, label: "freshharvests@gmail.com" },
  {
    icon: MapPin,
    label: "Tanjung Sari Street, Pontianak, Indonesia",
    multiline: true,
  },
];

export default function Footer() {
  return (
    <footer className="pt-8 lg:pt-16 bg-color-gray-20">
      <Container>
        <div className="space-y-6">
          {/* Mobile Logo */}
          <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 lg:hidden">
            <Image className="size-8" src={logo} alt="Logo" />
            <span className="font-rubik text-2xl font-bold text-color-black">
              Fresh Harvests
            </span>
          </div>

          {/* Top Panel */}
          <div className="flex justify-between gap-4">
            <LeftPanel />

            {/* Quick Links */}
            {quickLinkSections.map((section) => (
              <div key={section.title} className="flex flex-col space-y-4">
                <Heading
                  as="h3"
                  size="h6"
                  weight="medium"
                  className="max-lg:text-sm"
                >
                  {section.title}
                </Heading>
                <ul className="space-y-3">
                  {section.links.map((text) => (
                    <li key={text}>
                      <Link
                        href="#"
                        prefetch={false}
                        className="text-sm text-color-gray-100 hover:underline"
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Info */}
            <div className="flex flex-col space-y-4 max-w-sm">
              <Heading
                as="h3"
                size="h6"
                weight="medium"
                className="max-lg:text-sm"
              >
                Contact us
              </Heading>
              <div className="space-y-3 text-sm text-color-gray-100">
                {contactInfo.map(({ icon: Icon, label, multiline }) => (
                  <div
                    key={label}
                    className={`flex items-${
                      multiline ? "start" : "center"
                    } space-x-2`}
                  >
                    <Icon
                      className={`h-5 w-5 text-fresh-green flex-shrink-0 ${
                        multiline ? "mt-0.5" : ""
                      }`}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Payment - Desktop Only */}
              <div className="mt-6 hidden lg:block">
                <Heading as="h3" size="h6" weight="medium" className="text-sm!">
                  Accepted Payment Methods:
                </Heading>
                <div className="flex items-center space-x-4 mt-4">
                  <Image src={visa} alt="Visa" className="h-12 w-16" />
                  <Image src={paypal} alt="PayPal" className="h-12 w-16" />
                  <Image src={gPay} alt="GPay" className="h-12 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Payments & App Links */}
        <BottomPanel />

        {/* Footnote */}
        <Footnote />
      </Container>
    </footer>
  );
}

function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between space-y-4">
      <div className="flex items-center space-x-2">
        <Image className="size-10 lg:size-[3.25rem]" src={logo} alt="Logo" />
        <span className="font-rubik text-2xl lg:text-3xl font-bold text-color-black">
          Fresh Harvests
        </span>
      </div>

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
  );
}

function BottomPanel() {
  return (
    <div className="lg:hidden">
      {/* Payment Methods */}
      <div className="mt-6">
        <Heading as="h3" size="h6" weight="medium" className="text-sm!">
          Accepted Payment Methods:
        </Heading>
        <div className="flex items-center space-x-4 mt-4">
          <Image src={visa} alt="Visa" className="h-12 w-16" />
          <Image src={paypal} alt="PayPal" className="h-12 w-16" />
          <Image src={gPay} alt="GPay" className="h-12 w-16" />
        </div>
      </div>

      {/* App Download */}
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
  );
}

function Footnote() {
  return (
    <div className="border-t border-color-gray-50 mt-8 py-6 flex flex-col lg:flex-row gap-2 items-center justify-between">
      <span className="text-sm font-rubik font-medium order-2 lg:order-1">
        © {new Date().getFullYear()}, All Rights Reserved by Banana Studio
      </span>
      <span className="flex gap-2 order-1 lg:order-2">
        <Link href="#">
          <Image src={x} alt="X" className="size-8" />
        </Link>
        <Link href="#">
          <Image src={facebook} alt="Facebook" className="size-8" />
        </Link>
        <Link href="#">
          <Image src={instagram} alt="Instagram" className="size-8" />
        </Link>
      </span>
    </div>
  );
}
