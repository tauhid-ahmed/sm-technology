"use client";

import logo from "@/assets/logo.png";
import useAuthGuard from "@/hooks/useAuthGuard";
import type { RootState } from "@/store";
import { showAuthForm } from "@/store/slices/appSlice";
import { LucideHeart, LucideShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveLink from "./shared/ActiveLink";
import Button from "./shared/Button";
import Container from "./shared/Container";
import { cn } from "@/lib/utils";

const navData = [
  { name: "Home", hash: "#home" },
  { name: "Shop", hash: "#shop" },
  { name: "About us", hash: "#about-us" },
  { name: "Blog", hash: "#blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthGuard();
  const [activeHash, setActiveHash] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300 backdrop-blur bg-white/10",
        scrolled && "bg-white shadow-xs"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-[6.25rem] relative">
          {/* Logo */}
          <Link
            onClick={() => setActiveHash("#home")}
            href="/"
            className="flex items-center gap-2"
          >
            <Image className="size-10" src={logo} alt="Logo" />
            <span className="font-medium text-lg font-rubik">
              Fresh Harvests
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-16">
            {navData.map((item) => (
              <li key={item.name}>
                <ActiveLink
                  hash={item.hash}
                  active={activeHash === item.hash}
                  onClick={() => setActiveHash(item.hash)}
                >
                  {item.name}
                </ActiveLink>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden lg:flex gap-2 items-center cursor-pointer">
              <LucideHeart size={16} />
              Favorites
            </span>

            <CartButton />

            <div className="hidden lg:inline-flex">
              {user ? <SignOutButton /> : <SignInButton />}
            </div>

            <button
              className="lg:hidden ml-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {open && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden py-4 px-6">
              <ul className="flex flex-col gap-4">
                {navData.map((item) => (
                  <li key={item.name}>
                    <ActiveLink
                      hash={item.hash}
                      active={activeHash === item.hash}
                      onClick={() => setActiveHash(item.hash)}
                    >
                      {item.name}
                    </ActiveLink>
                  </li>
                ))}
                <li>
                  <span className="flex items-center gap-2 text-sm">
                    <LucideHeart size={16} />
                    Favorites
                  </span>
                </li>
                <li>
                  <SignInButton className="w-full" />
                </li>
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

function SignInButton({ ...props }) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="secondary"
      tone="outline"
      onClick={() => dispatch(showAuthForm())}
      size="sm"
      {...props}
    >
      Sign in
    </Button>
  );
}

function SignOutButton() {
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    location.reload();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="secondary"
      tone="outline"
      size="sm"
    >
      Sign out
    </Button>
  );
}

function CartButton() {
  const cartItems = useSelector((state: RootState) => state.app.cart);
  const itemCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <span className="flex gap-2 items-center text-sm cursor-pointer">
      <span className="relative">
        <LucideShoppingCart size={16} />
        <span className="bg-red-500 text-white rounded-full p-1 absolute size-4 text-xs -top-3 -right-2 inline-flex items-center justify-center">
          {itemCount}
        </span>
      </span>
      <span className="hidden sm:inline-block">Cart</span>
    </span>
  );
}
