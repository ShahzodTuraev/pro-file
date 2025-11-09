import Image from "next/image";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gradientBg}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Your All-in-One
            <span className={styles.gradient}> Digital Identity</span>
            <br />
            Platform
          </h1>
          <p className={styles.description}>
            Create stunning bio link pages and professional digital visit cards
            with unique shareable links. Build your online presence in minutes.
          </p>
          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>Create Your Profile</button>
            <button className={styles.secondaryBtn}>View Demo</button>
          </div>
        </div>

        {/* <div className={styles.imageWrapper}>
          <Image
            src="/home/card-temp.webp"
            alt="Digital profile dashboard preview"
            width={800}
            height={450}
            priority
            className={styles.heroImage}
          />
        </div> */}
      </div>
    </section>
  );
}
