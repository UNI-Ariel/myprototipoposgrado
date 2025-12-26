import styles from "./Empty.module.css";

export const Empty = () => {
  return (
    <div className={styles.fill}>
      <h2>Esta pagina esta en blanco intencionalmente</h2>
      <p>
        para denotar que solo se mantiene lo que existe en la pagina original
      </p>
    </div>
  );
};
