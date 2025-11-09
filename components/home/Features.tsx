import Image from "next/image";
import { Link2, CreditCard } from "lucide-react";
import styles from "@/styles/Features.module.css";

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Everything You Need to Shine Online</h2>
          <p className={styles.description}>
            Two powerful tools in one platform to create your perfect digital
            presence
          </p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div className={styles.iconWrapper}>
              <Link2 className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Create Bio Link Pages</h3>
            <p className={styles.cardDescription}>
              Design beautiful landing pages that showcase all your important
              links in one place. Perfect for social media bios, email
              signatures, and more.
            </p>
            <div className={styles.imageWrapper}>
              <Image
                src="/home/phone.webp"
                alt="Bio link page example with multiple social links"
                width={600}
                height={338}
                loading="lazy"
                className={styles.cardImage}
              />
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div className={styles.iconWrapper}>
              <CreditCard className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Digital Visit Cards</h3>
            <p className={styles.cardDescription}>
              Create professional digital business cards that can be shared
              instantly via QR codes or links. Make networking effortless and
              eco-friendly.
            </p>
            <div className={styles.imageWrapper}>
              <Image
                src="/home/phone_card.webp"
                alt="Digital business card design interface"
                width={600}
                height={338}
                loading="lazy"
                className={styles.cardImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
