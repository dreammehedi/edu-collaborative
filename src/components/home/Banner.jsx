import Button from "../../shared/button/Button";

function Banner() {
  return (
    <section className="w-full h-[calc(100vh-80px)]">
      <div
        className="w-full !bg-no-repeat !bg-center !bg-cover h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="px-4 text-center w-full md:max-w-3xl md:mx-auto space-y-3">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
              Welcome to the{" "}
              <span className="text-primary-main">EduCollaborative Study</span>{" "}
              Platform.
            </h1>
            <p className="text-gray-200">
              Our EduCollaborative Study Platform is designed to revolutionize
              the way you manage your educational activities. With a focus on
              seamless integration and user-friendly design, we bring together
              essential tools for study session scheduling, resource sharing,
              and user management in one comprehensive platform. Enhance
              collaboration, access valuable study materials, and streamline
              administrative tasks to support the dynamic needs of modern
              education.
            </p>
            <div className=" flex justify-center">
              <Button name={"Get Started"}></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
