import Button from "../../shared/button/Button";

function Banner() {
  return (
    <section className="w-full h-[calc(100vh-80px)]">
      <div
        className="w-full bg-center bg-cover h-[38rem]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
              Build your new <span className="text-blue-400">Saas</span> Project
            </h1>
            <Button name={"Start Project"}></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
