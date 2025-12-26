import { Carousel } from "@/components";
import styles from "./Home.module.css";
import { FaBuildingColumns } from "react-icons/fa6";
import { HiAcademicCap } from "react-icons/hi2";
import { Link } from "react-router-dom";

type programLink = {
  to: string;
  title: string;
  desc: string;
};

const programBanner = ({ to, title, desc }: programLink) => {
  return (
    <Link to={to} className={styles.programTarget}>
      <div className={styles.programIcon}>
        <HiAcademicCap />
      </div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </Link>
  );
};

const pageLinks = [
  {
    to: "/doctorados",
    title: "DOCTORADOS",
    desc: "Los programas de Doctorado tienen como objetivo principal la formación de investigadores capaces de generar nuevo conocimiento del más alto nivel contribuyendo a través de la investigación científica, desarrollo e innovación .",
  },
  {
    to: "/maestrias",
    title: "MAESTRÍAS",
    desc: "Las maestrías son estudios de mayor profundidad y proporcionan una formación superior en un área de una disciplina o en un área interdisciplinaria, al ahondar el desarrollo teórico, profesional, tecnológico, para la investigación, el estudio y adiestramiento específico.",
  },
  {
    to: "/diplomados",
    title: "DIPLOMADOS",
    desc: "Los diplomados son los estudios de menor duración y por ende los de menor profundidad, dependiendo de las horas académicas que conformen el programa. contamos con Programas de diplomado en todas la areas de la Facultad de Ciencias y Tecnología",
  },
];

export const Home = () => {
  const date = new Date();
  const dstring = `${date.getDate()} ${date.toLocaleDateString("es-ES", {
    month: "long",
  })} ${date.getFullYear()}`;

  return (
    <main className={styles.main}>
      <div className={styles.banners}>
        <div className={styles.mainBanner}>
          <h6>BIENVENIDO</h6>
          <h2>Dirección de Posgrado</h2>
          <h3>Facultad de Ciencias y Tecnología</h3>
          <p>
            El Posgrado es parte fundamental de la formación continua de
            nuestros profesionales, brindándoles especialización, actualización
            y mayores oportunidades laborales.{" "}
          </p>
        </div>
        <div className={styles.subBanner}>
          <img src="/images/banner-image.jpg"></img>
          <p className={styles.subdate}>{dstring}</p>
        </div>
      </div>

      <div className={styles.resena}>
        <Link className={styles.resenaLink} to={"/acercade"}>
          <FaBuildingColumns className={styles.resenaBtnIcon} />
        </Link>
        <h4>RESEÑA HISTORICA</h4>
        <p>
          La Dirección de Posgrado en la Facultad de Ciencias y Tecnología,
          ejerce desde 1995 y tiene a su cargo la formación de profesionales y
          académicos altamente calificados en la distintas áreas del
          conocimiento de su competencia; cuya oferta está estrechamente
          vinculada a la Investigación Científica y Tecnológica, propiciando
          garantizar la excelencia académica y calidad científica de los
          trabajos de grado, así como la actualización y formación profesional
          continua, que hace posible la interacción técnica con el medio.
        </p>
      </div>

      <h1 style={{ marginBottom: "1rem" }}>Oferta Académica</h1>
      <Carousel />

      <div className={styles.programLinks}>
        {pageLinks.map((l) => programBanner(l))}
      </div>
    </main>
  );
};
