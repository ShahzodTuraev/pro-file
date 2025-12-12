"use client";
import styles from "./kakao.module.css";

interface Link {
  icon: string;
  label: string;
  username: string;
  url: string;
  color: string;
}

export default function KakaoBiolink() {
  const links: Link[] = [
    {
      icon: "📷",
      label: "Instagram",
      username: "@yourhandle",
      url: "https://instagram.com/yourhandle",
      color: "#E4405F",
    },
    {
      icon: "🌐",
      label: "Website",
      username: "yourwebsite.com",
      url: "https://yourwebsite.com",
      color: "#4A90E2",
    },
    {
      icon: "✈️",
      label: "Telegram",
      username: "@yourtelegram",
      url: "https://t.me/yourtelegram",
      color: "#0088cc",
    },
    {
      icon: "📧",
      label: "Email",
      username: "hello@email.com",
      url: "mailto:hello@email.com",
      color: "#EA4335",
    },
    {
      icon: "📱",
      label: "Phone",
      username: "+1 234 567 8900",
      url: "tel:+1234567890",
      color: "#34C759",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      username: "Your Name",
      url: "https://linkedin.com/in/yourprofile",
      color: "#0A66C2",
    },
    {
      icon: "🎵",
      label: "YouTube",
      username: "@yourchannel",
      url: "https://youtube.com/@yourchannel",
      color: "#FF0000",
    },
    {
      icon: "💬",
      label: "KakaoTalk",
      username: "Your Kakao ID",
      url: "https://open.kakao.com/o/yourlink",
      color: "#FEE500",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.avatar}>👤</div>
        <h1 className={styles.name}>Your Name</h1>
        <p className={styles.bio}>
          Welcome to my profile! Connect with me through any platform below 💫
        </p>
      </div>

      <div className={styles.linksContainer}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={styles.linkCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className={styles.iconWrapper}
              style={{ background: `${link.color}15` }}
            >
              {link.icon}
            </div>
            <div className={styles.linkContent}>
              <div className={styles.linkLabel}>{link.label}</div>
              <div className={styles.linkUsername}>{link.username}</div>
            </div>
            <div className={styles.arrow}>→</div>
          </a>
        ))}
      </div>

      <div className={styles.footer}>Made with 💛 KakaoTalk Style</div>
    </div>
  );
}
