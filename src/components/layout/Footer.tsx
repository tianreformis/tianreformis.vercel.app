"use client";

import { motion } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/tianreformis", label: "GitHub" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/kristian-reformis-1148291b2/", label: "LinkedIn" },
  { icon: FiMail, href: "mailto:tianreformis.work@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Tian Reformis. All rights reserved.
          </p>
          <motion.div className="flex items-center gap-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
