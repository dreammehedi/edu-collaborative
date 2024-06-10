import { Link } from "react-router-dom";
import Button from "../../shared/button/Button";
import SectionTitle from "./../../shared/section_title/SectionTitle";

function Dashboard() {
  return (
    <>
      <div className="w-full h-full flex flex-col space-y-3 justify-center items-center text-center">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-primary"}
            secondCls={"text-black"}
            firstName={"Welcome your"}
            secondName={"Dashboard"}
            description={
              "Welcome to your personalized dashboard! Here, you can effortlessly manage and track your study sessions, monitor your progress, and interact with tutors and fellow learners. Access upcoming sessions,  review recent activities, and stay informed with real-time notifications. Utilize the resource center for all your study materials, and customize your experience with account and privacy settings. Dive into your learning journey and make the most of our collaborative platform to achieve your academic goals."
            }
          ></SectionTitle>
        </div>

        <div className="flex pt-4 justify-center items-center gap-8">
          <Link to={"/"}>
            <Button name={"Home"}></Button>
          </Link>
          {/* <Link to={"/dashboard/user-profile"}>
            <Button name={"Profile Update"}></Button>
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
