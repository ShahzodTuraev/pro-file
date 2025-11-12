"use client";
import { User } from "lucide-react";
import styles from "./Logo.module.css";
export default function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>
        <User className={styles.icon} />
      </div>
      <span className={styles.logoText}>ProFile</span>
    </div>
  );
}
