import { Helmet } from "react-helmet-async";
import Banner from "../../components/home/Banner";
import AllTutor from "../../components/home/all_tutor/AllTutor";
import LearnInfo from "../../components/home/learn_info/LearnInfo";
import StudySession from "../../components/home/study_session/StudySession";

function Home() {
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Home</title>
      </Helmet>
      <Banner></Banner>
      <StudySession></StudySession>
      <LearnInfo></LearnInfo>
      <AllTutor></AllTutor>
    </>
  );
}

export default Home;
