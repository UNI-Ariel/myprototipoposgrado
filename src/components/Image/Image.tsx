import { useState, type ReactNode } from "react";
import styles from "./Image.module.css";

type Props = {
  src: string;
  alt?: string;
  className?: string;

  lazy?: boolean;
  fallbackSrc?: string;
};

export const Image = ({
  src,
  alt = "Image",
  className = "",
  lazy = true,
  fallbackSrc = "/images/placeholder.png",
  children,
}: Props & { children?: ReactNode }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        onError={() => setError(true)}
      />
      {children}
    </div>
  );
};
