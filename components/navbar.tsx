"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/navigation";
import Logo from "./logo/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleAuth = (action: "signin" | "signup") => {
    router.push(`/${action}`);
  };
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Logo />

          <div className={styles.navLinks}>
            <Link href="#features" className={styles.navLink}>
              Features
            </Link>
            <Link href="#pricing" className={styles.navLink}>
              Pricing
            </Link>
            <Link href="#contact" className={styles.navLink}>
              Contact
            </Link>
          </div>

          <div className={styles.navButtons}>
            <button
              className={styles.signInBtn}
              onClick={() => handleAuth("signin")}
            >
              Sign In
            </button>
            <button
              className={styles.getStartedBtn}
              onClick={() => handleAuth("signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
