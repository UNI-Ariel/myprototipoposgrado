import styles from "./Modal.module.css";

export type ModalProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  variant?: "info" | "confirm"
};

export const Modal = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  variant = "info",
} : ModalProps) => {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && <h3>{title}</h3>}
        <p>{message}</p>

        <div className={styles.actions}>
          {variant === "confirm" ? (
            <>
              <button
                className={styles.cancel}
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className={styles.confirm}
                onClick={onConfirm}
              >
                Confirmar
              </button>
            </>
          ) : (
            <button
              className={styles.confirm}
              onClick={onClose}
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
