"use client";
import styles from "@/styles/Navbar.module.css";
export default function Navbar() {
  return (
    <main className={styles.container}>
      <h2 className={styles.logo}>ProFile</h2>
      <div className={styles.navList}>
        <nav>Templates</nav>
        <nav>FAQ</nav>
        <nav>Blog</nav>
      </div>
      <div className={styles.authBox}>
        <p>Log in</p>
        <p>Sign up</p>
      </div>
    </main>
  );
}
