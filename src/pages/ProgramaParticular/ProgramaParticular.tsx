import styles from "./ProgramaParticular.module.css";
import { data } from "@/assets/data";
import { Banner, Image, TabView, Modal } from "@/components";
import { useState } from "react";
import { CiGlobe, CiMail } from "react-icons/ci";
import { FaWhatsapp, FaCheck, FaDownload } from "react-icons/fa";

import { useParams, Navigate, Link } from "react-router-dom";

const validTypes = ["diplomados", "maestrias", "doctorados"] as const;
type ProgramType = (typeof validTypes)[number];

export const ProgramaParticular = () => {
  const { tipo, programa } = useParams<{
    tipo: ProgramType;
    programa: string;
  }>();

  if (!tipo || !validTypes.includes(tipo)) {
    return <Navigate to="/404" replace />;
  }

  const items = data[tipo].filter((p) => p.to === `/${tipo}/${programa}`);
  if (!items.length)
    return (
      <div className={styles.notFound}>
        <h2>Programa no Encontrado</h2>
        <Link to={`/${tipo}`}>Volver</Link>
      </div>
    );

  /* console.log(items[0]); */

  const program = items[0];

  const displayModal = (variant: string, message?: string) => {
    if (variant === "confirm") {
      setModalOps({
        open: true,
        variant: "confirm",
        title: "Confirmar",
        message: "Suscribirse al programa?",
      });
    }

    if (variant === "info") {
      setModalOps({
        open: true,
        variant: "info",
        title: "Información",
        message: message ?? "",
      });
    }
  };

  const closeModal = () => {
    setModalOps((prev) => ({ ...prev, open: false }));
  };

  const simulateConfirm = () => {
    displayModal(
      "info",
      `Se ha suscrito para recibir notificaciones del programa ${program.meta.name}`
    );
  };

  const confirmModal = () => {
    closeModal();
    setTextInput("");
    setTimeout(simulateConfirm, 500);
  };

  type ModalVariant = "confirm" | "info";

  interface ModalState {
    open: boolean;
    title: string;
    message: string;
    variant: ModalVariant;
  }

  const [modalOps, setModalOps] = useState<ModalState>({
    open: false,
    title: "",
    message: "",
    variant: "confirm",
  });

  const [textInput, setTextInput] = useState("");

  const descTab = () => {
    return (
      <div className={styles.descTab}>
        <Image src={program.img} className={styles.descImage} />
        <div className={styles.descText}>{program.meta.description}</div>
      </div>
    );
  };

  const detailTab = () => {
    return (
      <div className={styles.detTab}>
        <div className={styles.detCol}>
          <div className={styles.detRow}>
            <h6>Coordinador</h6>
            <h5>MSc. Ing. Marcelo Antezana Camacho</h5>
          </div>

          <div className={styles.detRow}>
            <Link to={"https://posgrado.fcyt.umss.edu.bo"}>
              <CiGlobe /> posgrado.fcyt.umss.edu.bo
            </Link>
            <a href="mailto:apoyo.dir.dpg@fcyt.umss.edu.bo">
              <CiMail /> apoyo.dir.dpg@fcyt.umss.edu.bo
            </a>
            <a href="https://api.whatsapp.com/send?phone=59178348995">
              <FaWhatsapp /> 783-48995
            </a>
          </div>
        </div>

        <div className={styles.detCol}>
          <div className={styles.detRow}>
            <h6>Cupos disponibles</h6>
            <h5>10</h5>
          </div>

          <div className={styles.detRow}>
            <h6>Costo</h6>
            <h5>{program.price}</h5>
          </div>

          <div className={styles.detRow}>
            <h6>Costo por modulo</h6>
            <h5>{program.meta.details.costo_por_modulo}</h5>
          </div>

          <div className={styles.detRow}>
            <h6>Descuento</h6>
            <h5>{program.meta.details.descuento}</h5>
          </div>
        </div>

        <div className={styles.detCol}>
          <div className={styles.detRow}>
            <h6>Grado Académico</h6>
            <h5>{program.meta.details.grado_académico}</h5>
          </div>

          <div className={styles.detRow}>
            <h6>Dirigido a</h6>
            <h5>{program.meta.details.modalidad}</h5>
          </div>

          <div className={styles.detRow}>
            <h6>Duración</h6>
            <h5>6 Meses</h5>
          </div>

          <div className={styles.detRow}>
            <h6>Fecha de Inicio</h6>
            <h5>{program.meta.details.fecha_de_inicio}</h5>
          </div>
        </div>
      </div>
    );
  };

  const requTab = () => {
    return (
      <ul className={styles.reqList}>
        {program.meta.requirements.map((req, index) => (
          <li key={`req-${index}`}>
            <FaCheck className={styles.icon} /> {req}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main className={styles.main}>
      <Banner title={tipo} />

      <TabView
        className={styles.media}
        title={program.meta.name}
        tabs={[
          { label: "Descripción", content: descTab() },
          { label: "Detalles del programa", content: detailTab() },
          { label: "Requisitos", content: requTab() },
        ]}
      />

      <div className={styles.files}>
        <h5>Descarga de Archivos:</h5>
        <div className={styles.dlButtons}>
          <button type="button" className={styles.dlButton}>
            <FaDownload /> Compromiso
          </button>
          <button type="button" className={styles.dlButton}>
            <FaDownload /> Ficha de Inscripción
          </button>
          <button type="button" className={styles.dlButton}>
            <FaDownload /> Brochure
          </button>
        </div>

        <h5>Recibir notificaciones:</h5>
        <form
          className={styles.subscribe}
          onSubmit={(e) => {
            if (e.currentTarget.checkValidity()) {
              displayModal("confirm");
              e.preventDefault();
            }
          }}
        >
          <label>
            Correo
            <input
              type="email"
              name="email"
              required
              placeholder="ejemplo@correo.com"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </label>
          <button type="submit">Suscribirme</button>
        </form>
      </div>

      <Modal
        open={modalOps.open}
        title={modalOps.title}
        message={modalOps.message}
        variant={modalOps.variant}
        onClose={closeModal}
        onConfirm={confirmModal}
      />
    </main>
  );
};
