import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../components/dashboard/navbar/DashboardNavbar";
import DashboardNavigate from "../../components/dashboard/navigate/DashboardNavigate";

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard</title>
      </Helmet>
      <section>
        <DashboardNavbar></DashboardNavbar>
        <main className="py-12 container grid grid-cols-4 gap-10 justify-between">
          <DashboardNavigate></DashboardNavigate>
          <div className="col-span-3 shadow-md p-4">
            <Outlet></Outlet>
          </div>
        </main>
      </section>
    </>
  );
}

export default Dashboard;
