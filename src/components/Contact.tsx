"use client";

import { Instagram, Mail, MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const whatsappHref =
  "https://wa.me/9779807901226?text=Hi%20Ganesh%2C%20I%20want%20to%20start%20a%20project%20with%20you.";

const socials = [
  {
    label: "Email",
    href: "mailto:ganeshkharel05@gmail.com",
    icon: Mail
  },
  {
    label: "WhatsApp",
    href: whatsappHref,
    icon: MessageCircle
  },
  {
    label: "Instagram",
    href: "https://instagram.com/pravesh_kharel",
    icon: Instagram
  }
];

export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-inner">
        <span className="status-pill">
          <span />
          Ready for the next brief
        </span>
        <h2>Have a brand, product, or idea that needs clean visuals?</h2>
        <p>
          Let’s shape the message, visual system, and launch assets so your work feels premium and converts with
          intention.
        </p>
        <div className="contact-actions">
          <MagneticButton href={whatsappHref}>Let’s Make It Convert</MagneticButton>
          <a className="contact-ghost" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            WhatsApp Me
          </a>
        </div>
        <div className="social-row">
          {socials.map((social) => {
            const Icon = social.icon;

            return (
              <a
                href={social.href}
                key={social.label}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <Icon size={14} />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
