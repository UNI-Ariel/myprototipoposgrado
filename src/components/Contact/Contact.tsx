import { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className={styles.aside}>
      {/* Botones secundarios */}
      <div
        className={`${styles.actions} ${open ? styles.open : styles.closed}`}
      >
        <button className={styles.robot}>
          <FaRobot className={styles.icon}/>
        </button>

        <a
          href="https://www.facebook.com/posgradofcyt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF className={styles.icon} />
        </a>

        <a
          href="https://www.instagram.com/posgradooficialfcyt/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className={styles.icon} />
        </a>

        <a
          href="https://api.whatsapp.com/send?phone=59144116122"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className={styles.icon} />
        </a>
      </div>

      {/* Botón principal */}
      <button
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Abrir opciones de contacto"
      >
        {open ? <FaTimes /> : <IoChatbubbleEllipsesOutline />}
      </button>
    </aside>
  );
};
