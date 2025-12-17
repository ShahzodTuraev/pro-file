"use client";
import React, { useState } from "react";

const BioLinkProfile = () => {
  const [bgColor, setBgColor] = useState("#6366f1");

  const backgroundColors = [
    { name: "Indigo", color: "#6366f1" },
    { name: "Purple", color: "#a855f7" },
    { name: "Pink", color: "#ec4899" },
    { name: "Rose", color: "#f43f5e" },
    { name: "Orange", color: "#f97316" },
    { name: "Emerald", color: "#10b981" },
    { name: "Cyan", color: "#06b6d4" },
    { name: "Blue", color: "#3b82f6" },
  ];

  const profile = {
    name: "Alex Morgan",
    bio: "✨ Digital Creator | Coffee Enthusiast ☕\nSharing my journey through design, code, and creativity",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    socialLinks: [
      { name: "Instagram", icon: "📷", url: "https://instagram.com" },
      { name: "Twitter", icon: "🐦", url: "https://twitter.com" },
      { name: "YouTube", icon: "🎥", url: "https://youtube.com" },
      { name: "TikTok", icon: "🎵", url: "https://tiktok.com" },
      { name: "LinkedIn", icon: "💼", url: "https://linkedin.com" },
      { name: "GitHub", icon: "💻", url: "https://github.com" },
    ],
    links: [
      { title: "🎨 My Portfolio", url: "#" },
      { title: "📝 Latest Blog Post", url: "#" },
      { title: "🛍️ Shop My Favorites", url: "#" },
      { title: "💌 Newsletter Signup", url: "#" },
    ],
  };

  const styles: any = {
    container: {
      minHeight: "100vh",
      background: bgColor,
      padding: "2rem 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: "background 0.3s ease",
    },
    card: {
      width: "100%",
      maxWidth: "480px",
      background: "white",
      borderRadius: "24px",
      padding: "2.5rem 1.5rem",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    colorPicker: {
      display: "flex",
      gap: "0.5rem",
      justifyContent: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    colorButton: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      border: "3px solid white",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    profileSection: {
      textAlign: "center",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      marginBottom: "1.5rem",
      border: "4px solid " + bgColor,
      objectFit: "cover",
      transition: "border-color 0.3s ease",
    },
    name: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1a202c",
      marginBottom: "0.75rem",
      margin: 0,
    },
    bio: {
      fontSize: "0.95rem",
      color: "#4a5568",
      lineHeight: "1.6",
      marginBottom: "2rem",
      whiteSpace: "pre-line",
      margin: 0,
    },
    linkList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      width: "100%",
    },
    snsButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      width: "100%",
      padding: "1rem",
      background: "#f7fafc",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      color: "#2d3748",
      textDecoration: "none",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
    linkButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "1rem",
      background: bgColor,
      color: "white",
      textAlign: "center",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "none",
    },
    divider: {
      height: "1px",
      background: "#e2e8f0",
      margin: "2rem 0",
      width: "100%",
    },
  };

  const handleColorClick = (color: any) => {
    setBgColor(color);
  };

  const handleSnsHover = (e: any) => {
    e.currentTarget.style.background = bgColor;
    e.currentTarget.style.color = "white";
    e.currentTarget.style.borderColor = bgColor;
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleSnsLeave = (e: any) => {
    e.currentTarget.style.background = "#f7fafc";
    e.currentTarget.style.color = "#2d3748";
    e.currentTarget.style.borderColor = "#e2e8f0";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleLinkHover = (e: any) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
    e.currentTarget.style.opacity = "0.9";
  };

  const handleLinkLeave = (e: any) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.opacity = "1";
  };

  const handleColorHover = (e: any) => {
    e.currentTarget.style.transform = "scale(1.15)";
  };

  const handleColorLeave = (e: any) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Color Picker */}
        <div style={styles.colorPicker}>
          {backgroundColors.map((item, index) => (
            <button
              key={index}
              style={{ ...styles.colorButton, background: item.color }}
              onClick={() => handleColorClick(item.color)}
              onMouseEnter={handleColorHover}
              onMouseLeave={handleColorLeave}
              aria-label={`Change background to ${item.name}`}
            />
          ))}
        </div>

        {/* Profile Section */}
        <div style={styles.profileSection}>
          <img src={profile.avatar} alt={profile.name} style={styles.avatar} />
          <h1 style={styles.name}>{profile.name}</h1>
          <p style={styles.bio}>{profile.bio}</p>
        </div>

        {/* Social Links - Full Width */}
        <div style={styles.linkList}>
          {profile.socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              style={styles.snsButton}
              onMouseEnter={handleSnsHover}
              onMouseLeave={handleSnsLeave}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontSize: "1.25rem" }}>{social.icon}</span>
              <span>{social.name}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Main Links */}
        <div style={styles.linkList}>
          {profile.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              style={styles.linkButton}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BioLinkProfile;
