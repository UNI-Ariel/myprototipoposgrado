import styles from "./ProgramFilter.module.css";

type Props = {
  variant?: "row" | "column";
  tags: string[];
  active: string;
  filter: (tag: string) => void;
};

export const ProgramFilter = ({
  variant = "row",
  tags,
  active,
  filter,
}: Props) => {
  return (
    <div
      className={`${styles.filterContainer} ${
        variant === "column" ? styles.column : ""
      }`}
    >
      {tags.map((label) => (
        <button
          key={`filter-${label}`}
          type="button"
          className={`${active === label ? styles.active : ""}`}
          onClick={() => filter(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
