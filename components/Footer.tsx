"use client";
import { User } from "lucide-react";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <User className={styles.icon} />
          </div>
          <span className={styles.logoText}>ProFile</span>
        </div>

        <p className={styles.copyright}>
          &copy; 2025 ProFile. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
