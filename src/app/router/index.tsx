import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts";

import {
  Avisos,
  Acercade,
  Contacto,
  Documentacion,
  Home,
  Programas,
  ProgramaParticular
} from "@/pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/diplomados",
        element: <Programas tipo={"diplomados"} />,
      },
      {
        path: "/maestrias",
        element: <Programas tipo={"maestrias"} />,
      },
      {
        path: "/doctorados",
        element: <Programas tipo={"doctorados"} />,
      },
      {
        path: "/:tipo/:programa",
        element: <ProgramaParticular />
      },
      {
        path: "/avisos",
        element: <Avisos />,
      },
      {
        path: "/contacto",
        element: <Contacto />,
      },
      {
        path: "/documentacion",
        element: <Documentacion />,
      },
      {
        path: "/acercade",
        element: <Acercade />,
      }
    ],
  },
]);
