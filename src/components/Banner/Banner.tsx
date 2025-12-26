import styles from "./Banner.module.css";

type Props = {
  title: string;
};

export const Banner = ({ title }: Props) => {
  return <div className={styles.banner}>{title}</div>;
};
