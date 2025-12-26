import { useState, type ReactNode } from "react";
import styles from "./TabView.module.css";

type Tab = {
  label: string;
  content: ReactNode;
};

type Props = {
  title: string;
  tabs: Tab[];
  defaultActive?: number;
  className?: string;
};

export const TabView = ({ title, tabs, defaultActive = 0, className = "" }: Props) => {
  const [active, setActive] = useState(defaultActive);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5>Ficha del Programa</h5>
        <h4>{title}</h4>
      </div>

      <div className={`${styles.content} ${className}`}>{tabs[active].content}</div>

      <div className={styles.controls}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActive(index)}
            className={`${styles.button} ${
              active === index ? styles.active : ""
            }`}
            aria-selected={index === active}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
