import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import DashboardNavbar from "../../components/dashboard/navbar/DashboardNavbar";
import DashboardNavigate from "../../components/dashboard/navigate/DashboardNavigate";

function Dashboard() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard</title>
      </Helmet>
      <section>
        <DashboardNavbar></DashboardNavbar>
        <main className="py-12 px-8 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 justify-between">
          <aside className="col-span-1">
            <DashboardNavigate></DashboardNavigate>
          </aside>

          <article className="lg:col-span-3 shadow-md p-4">
            <Outlet></Outlet>
          </article>
        </main>
      </section>
    </>
  );
}

export default Dashboard;
