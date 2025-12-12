// register.tsx
"use client";
import React, { useState } from "react";
import styles from "./register.module.css";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface UserProfile {
  name: string;
  bio: string;
  location: string;
  image: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
}

export default function RegisterPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    bio: "",
    location: "",
    image: "",
    email: "",
    phone: "",
    socialLinks: [],
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [currentPlatform, setCurrentPlatform] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const platforms = [
    {
      name: "Instagram",
      icon: "📷",
      placeholder: "https://instagram.com/username",
    },
    { name: "Website", icon: "🌐", placeholder: "https://yourwebsite.com" },
    { name: "Telegram", icon: "✈️", placeholder: "https://t.me/username" },
    {
      name: "LinkedIn",
      icon: "💼",
      placeholder: "https://linkedin.com/in/username",
    },
    {
      name: "YouTube",
      icon: "🎵",
      placeholder: "https://youtube.com/@channel",
    },
    {
      name: "Twitter",
      icon: "🐦",
      placeholder: "https://twitter.com/username",
    },
    { name: "TikTok", icon: "🎬", placeholder: "https://tiktok.com/@username" },
    {
      name: "KakaoTalk",
      icon: "💬",
      placeholder: "https://open.kakao.com/o/yourlink",
    },
    { name: "GitHub", icon: "💻", placeholder: "https://github.com/username" },
    { name: "Discord", icon: "🎮", placeholder: "username#0000" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setProfile({ ...profile, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialLink = () => {
    if (currentPlatform && currentUrl) {
      const platformData = platforms.find((p) => p.name === currentPlatform);
      if (platformData) {
        setProfile({
          ...profile,
          socialLinks: [
            ...profile.socialLinks,
            {
              platform: currentPlatform,
              url: currentUrl,
              icon: platformData.icon,
            },
          ],
        });
        setCurrentPlatform("");
        setCurrentUrl("");
      }
    }
  };

  const removeSocialLink = (index: number) => {
    setProfile({
      ...profile,
      socialLinks: profile.socialLinks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Data:", profile);
    alert("Profile saved successfully! Check console for data.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Your Profile</h1>
          <p className={styles.subtitle}>Build your personal biolink page</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Profile Image */}
          <div className={styles.imageSection}>
            <label className={styles.imageLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.imageInput}
              />
              <div className={styles.imagePreview}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className={styles.previewImg}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.cameraIcon}>📷</span>
                    <span className={styles.uploadText}>Upload Photo</span>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Basic Info */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Basic Information</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelIcon}>👤</span>
                Full Name *
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Enter your name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelIcon}>📝</span>
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className={styles.textarea}
                rows={4}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelIcon}>📍</span>
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                placeholder="City, Country"
                className={styles.input}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelIcon}>📧</span>
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelIcon}>📱</span>
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                placeholder="+1 234 567 8900"
                className={styles.input}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Social Links</h2>

            <div className={styles.socialInputGroup}>
              <select
                value={currentPlatform}
                onChange={(e) => setCurrentPlatform(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform.name} value={platform.name}>
                    {platform.icon} {platform.name}
                  </option>
                ))}
              </select>

              <input
                type="url"
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                placeholder={
                  currentPlatform
                    ? platforms.find((p) => p.name === currentPlatform)
                        ?.placeholder
                    : "Enter URL"
                }
                className={styles.input}
              />

              <button
                type="button"
                onClick={addSocialLink}
                className={styles.addButton}
                disabled={!currentPlatform || !currentUrl}
              >
                Add
              </button>
            </div>

            {/* Social Links List */}
            {profile.socialLinks.length > 0 && (
              <div className={styles.socialList}>
                {profile.socialLinks.map((link, index) => (
                  <div key={index} className={styles.socialItem}>
                    <span className={styles.socialIcon}>{link.icon}</span>
                    <div className={styles.socialInfo}>
                      <span className={styles.socialPlatform}>
                        {link.platform}
                      </span>
                      <span className={styles.socialUrl}>{link.url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className={styles.removeButton}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
