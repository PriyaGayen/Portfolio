import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function ContactFooter({ email, name, currentColors }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ padding: "2rem 0 3rem 0", marginTop: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        {/* Minimal Header */}
        <div
          style={{
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: currentColors.textDim,
            fontFamily: "'Courier New', Courier, monospace",
            marginBottom: "1.5rem",
          }}
        >
          Contact
        </div>

        <p
          style={{
            color: currentColors.textDim,
            maxWidth: "520px",
            margin: "0 auto 2.5rem auto",
            lineHeight: "1.7",
            fontSize: "1rem",
          }}
        >
          I'm currently looking for new opportunities and my inbox is always
          open. Whether you have a question or just want to say hi, I'll try my
          best to get back to you!
        </p>

        <a
          href={`mailto:${email}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: isHovered ? currentColors.textMain : "transparent",
            color: isHovered ? currentColors.bg : currentColors.textMain,
            border: `1px solid ${currentColors.textMain}`,
            padding: "0.8rem 1.75rem",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "600",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
          }}
        >
          say hello <FiArrowUpRight style={{ fontSize: "1.1rem" }} />
        </a>
      </div>

      {/* Footer Copyright */}
      <div
        style={{
          textAlign: "center",
          color: currentColors.textDim,
          fontSize: "0.85rem",
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        designed & built by {name.toLowerCase()}
      </div>
    </div>
  );
}
