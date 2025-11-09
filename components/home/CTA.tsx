"use client";
import styles from "@/styles/CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to Build Your Digital Identity?</h2>
        <p className={styles.description}>
          Join thousands of professionals who trust pro-file.top for their
          online presence
        </p>
        <button className={styles.button}>Start for Free</button>
      </div>
    </section>
  );
}
