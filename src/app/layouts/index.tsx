import { Nav, Footer, Contact } from "@/components";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <Contact />
    </>
  );
};
