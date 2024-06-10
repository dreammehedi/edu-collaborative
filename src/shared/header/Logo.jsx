import logo from "../../assets/logo.png";

function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img
        src={logo}
        alt="logo"
        className="w-[40px] md:w-[50px] h-auto object-cover"
      />
      <div className="flex flex-col">
        <span className="text-[18px] md:text-xl font-bold text-primary">
          EduCollaborate
        </span>
        <span className="capitalize  md:text-sm font-medium text-primary-main">
          Education & Courses
        </span>
      </div>
    </div>
  );
}

export default Logo;
