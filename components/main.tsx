"use client";
import styles from "../styles/Main.module.css";
import Image from "next/image";
export default function MainPage() {
  return (
    <main className={styles.boxWrap}>
      <div className={styles.box}>
        <div className={styles.head}>
          <div className={styles.textHead}>
            <h1>Create your own digital identity</h1>
            <p>
              Build your personalized bio link or digital business card in
              minutes. Share your pro-file link anywhere and grow your network.
            </p>
          </div>
          <div className={styles.slideHead}>
            <Image
              src="/home/bio-temp.webp"
              width={230}
              height={0}
              alt="templ"
              className={styles.bioTemp}
            />
            <Image
              src="/home/card-temp.webp"
              width={290}
              height={0}
              alt="templ"
              className={styles.cardTemp}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
