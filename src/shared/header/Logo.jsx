import logo from "../../assets/logo.png";

function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={logo} alt="logo" className="w-[50px] h-auto object-cover" />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-primary">EduCollaborate</span>
        <span className="capitalize text-sm font-medium text-primary-main">
          Education & Courses
        </span>
      </div>
    </div>
  );
}

export default Logo;
