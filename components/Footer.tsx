"use client";
import { User, Twitter, Linkedin, Instagram } from "lucide-react";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <User className={styles.icon} />
          </div>
          <span className={styles.logoText}>pro-file.top</span>
        </div>

        <p className={styles.copyright}>
          &copy; 2025 pro-file.top. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
