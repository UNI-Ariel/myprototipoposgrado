import styles from "./Card.module.css";
import { Link } from "react-router-dom";

type BaseProps = {
  img: string;
  cost: string;
};

type Main = BaseProps & {
  variant: "Main";
  to: string;
};

type Program = BaseProps & {
  variant: "Program";
  to: string;
  name: string;
  cost: string;
};

type Props = Main | Program;

export const Card = (props: Props) => {
  if (props.variant === "Main") {
    return (
      <Link className={`${styles.card} ${styles.shadow}`} to={props.to}>
        <div className={styles.imageContainer}>
          <img src={props.img} alt="img" className={styles.image} />
        </div>
        <div className={styles.info}>
          <p>Mas información</p>
          <h3>{props.cost}</h3>
        </div>
      </Link>
    );
  }

  return (
    <Link className={`${styles.card} ${styles.box}`} to={props.to}>
      <span className={styles.hangingCost}>{props.cost}</span>
      <div className={styles.imageContainer}>
        <img src={props.img} alt="img" className={styles.image} />
      </div>
      <div className={styles.details}>
        <p>{props.name}</p>
      </div>
    </Link>
  );
};
