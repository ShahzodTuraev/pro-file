"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/navigation";
import Logo from "./logo/Logo";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";

export default function Header() {
  // INITIALIZATIONS
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const auth = useSession();
  // HANDLERS

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      setOpen(false);
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
          <div></div>
          {auth.status === "unauthenticated" ? (
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
          ) : auth.status === "authenticated" ? (
            <div className={styles.accountBox}>
              <p>{auth?.data?.user?.email}</p>
              <>
                <div
                  onClick={() => setOpen(!open)}
                  className={styles.avatarBox}
                >
                  <img
                    className={styles.avatar}
                    src="/home/user.svg"
                    alt="user"
                  />{" "}
                  {open ? <ChevronUp width={20} /> : <ChevronDown width={20} />}
                  {open && (
                    <div onClick={() => signOut()} className={styles.logout}>
                      <LogOut />
                      Logout
                    </div>
                  )}
                </div>
              </>
            </div>
          ) : (
            <div>ksfj</div>
          )}
        </div>
      </nav>
    </header>
  );
}
