import { Helmet } from "react-helmet-async";
import Banner from "../../components/home/Banner";
import StudySession from "../../components/home/study_session/StudySession";

function Home() {
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Home</title>
      </Helmet>
      <Banner></Banner>
      <StudySession></StudySession>
    </>
  );
}

export default Home;
