"use client";
import styles from "./white.module.css";
export default function WhiteTemp() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img className={styles.avatar} src="/home/user.png" alt="avatar" />
        <h1 className={styles.username}>User Name</h1>
        <p className="border border-blue-400">user bio here</p>
      </div>
    </main>
  );
}
