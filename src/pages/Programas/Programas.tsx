import styles from "./Programas.module.css";
import { useState, useMemo } from "react";

import { data } from "@/assets/data";
import { Card, ProgramFilter } from "@/components";

type props = {
  tipo: "diplomados" | "maestrias" | "doctorados";
};

const filter1 = ["Ofertados", "En curso", "Todos"];
const filter2 = [
  "Todos",
  "Informática",
  "Sistemas",
  "Electrónica",
  "Química",
  "Mecánica",
];

export const Programas = ({ tipo }: props) => {
  const programs = data[tipo];

  const [statusFilter, setStatusFilter] = useState("Ofertados");
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  const filteredPrograms = useMemo(() => {
  return programs.filter((program) => {
    const matchStatus =
      statusFilter === "Todos" || program.status === statusFilter;

    const matchCategory =
      categoryFilter === "Todos" || program.category === categoryFilter;

    return matchStatus && matchCategory;
  });
}, [programs, statusFilter, categoryFilter]);

  return (
    <main className={styles.main}>
      <div className={styles.banner}>{tipo}</div>
      <ProgramFilter
        tags={filter1}
        active={statusFilter}
        filter={setStatusFilter}
      />
      <div className={styles.content}>
        <div className={styles.cards}>
          {filteredPrograms.map((fp) => (
            <Card
              key={fp.to}
              to={fp.to}
              variant="Program"
              img={fp.img}
              cost={fp.price}
              name={"Mock Name"}
            />
          ))}
        </div>
        <div className={styles.leftFilter}>
          <ProgramFilter
            variant="column"
            tags={filter2}
            active={categoryFilter}
            filter={setCategoryFilter}
          />
        </div>
      </div>
    </main>
  );
};
