import styles from "./Programas.module.css";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { data } from "@/assets/data";
import { Image, ProgramFilter } from "@/components";
import { RiComputerLine } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";

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

const processDate = (date: string) => {
  const parts = date.split(" de ");
  return `${parts[0]} ${parts[1].toUpperCase()}`;
}

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
            <Link to={fp.to} key={fp.to} className={styles.program}>
              <Image src={fp.img} className={styles.imgbkp} />

              <div className={styles.meta}>
                <h6>{fp.meta.details.grado_académico}</h6>
                <h5>{fp.meta.name}</h5>

                <h6>INSCRIPCIONES</h6>
                <h5>ABIERTAS</h5>
                <h6>{fp.meta.details.fecha_de_inicio.split(" de ").at(-1)}</h6>

                <div className={styles.flex}>
                  <span><FaRegClock />6 MESES</span>
                  <span><RiComputerLine />VIRTUAL</span>
                  <span><CiCalendar />{processDate(fp.meta.details.fecha_de_inicio)}</span>
                </div>

                <h6>{fp.meta.details.modalidad.join(", ")}</h6>

              </div>
              <span className={styles.programCost}>{fp.price}</span>
            </Link>
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
