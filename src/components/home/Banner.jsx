import Button from "../../shared/button/Button";

function Banner() {
  return (
    <section className="w-full h-[calc(100vh-80px)]">
      <div
        className="w-full bg-center bg-cover h-full"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="text-center w-full md:max-w-2xl md:mx-auto space-y-3">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
              Ace Your Exams with
              <span className="text-primary-main">Collaborative Study</span>
              Session Build your new
            </h1>
            <p className="text-gray-200">
              Join a community of learners, share knowledge, and improve your
              grades together.
            </p>
            <Button name={"Get Started"}></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
