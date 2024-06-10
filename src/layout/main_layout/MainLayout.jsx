import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../shared/footer/Footer";
import Header from "../../shared/header/Header";
import ScrollToTop from "./../../components/scroll_to_top/ScrollToTop";

function MainLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
