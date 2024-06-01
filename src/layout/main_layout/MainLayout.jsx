import { Outlet } from "react-router-dom";
import Footer from "../../shared/footer/Footer";
import Header from "../../shared/header/Header";

function MainLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
