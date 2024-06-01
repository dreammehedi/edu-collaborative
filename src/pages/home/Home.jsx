import { Helmet } from "react-helmet-async";
import Banner from "../../components/home/Banner";

function Home() {
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Home</title>
      </Helmet>
      <Banner></Banner>
    </>
  );
}

export default Home;
