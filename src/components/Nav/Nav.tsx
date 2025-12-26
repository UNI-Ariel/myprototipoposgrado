import img from "@/assets/logo.png";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

import { useState } from "react";

import { FaChevronDown, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Search } from "../Search/Search";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  /* const [submenuOpen, setSubmenuOpen] = useState(false); */
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <button
        className={`${styles.button} ${styles.burger}`}
        aria-label="Abrir Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars />
      </button>

      <NavLink to={"/"} onClick={() => setMenuOpen(false)}>
        <img src={img} className={styles.logo} />
      </NavLink>

      <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        <div className={`${styles.burgerClose} ${styles.burger}`}>
          <span>Posgrado FCyT</span>
          <button
            className={styles.button}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaTimes />
          </button>
        </div>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setMenuOpen(false)}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/diplomados"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setMenuOpen(false)}
        >
          Diplomados
        </NavLink>
        <NavLink
          to="/maestrias"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setMenuOpen(false)}
        >
          Maestrias
        </NavLink>
        <NavLink
          to="/doctorados"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setMenuOpen(false)}
        >
          Doctorados
        </NavLink>
        <div className={styles.submenucontainer}>
          Información <FaChevronDown size={12} className={styles.icon} />
          <div className={styles.submenu}>
            <NavLink
              to="/avisos"
              className={styles.sublink}
              onClick={() => setMenuOpen(false)}
            >
              Avisos
            </NavLink>
            <NavLink
              to="/documentacion"
              className={styles.sublink}
              onClick={() => setMenuOpen(false)}
            >
              Documentación
            </NavLink>
            <NavLink
              to="/acercade"
              className={styles.sublink}
              onClick={() => setMenuOpen(false)}
            >
              Acerca de
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/contacto"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setMenuOpen(false)}
        >
          Contactos
        </NavLink>
      </div>

      <div className={styles.searchBox}>
        <button
          className={styles.button}
          aria-haspopup="dialog"
          aria-expanded={searchOpen}
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
        >
          <FaSearch size={14} />
        </button>

        <Search
          className={`${styles.animate} ${!searchOpen ? styles.hidden : ""}`}
          setIsVisible={setSearchOpen}
        />
      </div>
    </nav>
  );
};
