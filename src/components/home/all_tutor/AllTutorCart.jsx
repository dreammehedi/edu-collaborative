function AllTutorCart() {
  return (
    <>
      <div className="w-full overflow-hidden bg-white rounded-md shadow-md">
        <img
          className="object-cover w-full h-56"
          src="https://img.freepik.com/free-photo/pretty-young-student-with-big-glasses-near-some-books-smiling-white-background_231208-1850.jpg?t=st=1717250737~exp=1717254337~hmac=2b1b96ad4e7154cea5907b595e63019af2062c8c7cb1736f65078a6d246967c8&w=740"
          alt="avatar"
        />

        <div className="space-y-1 p-4">
          <span className="font-medium text-primary">John Smith</span>
          <h2 className="font-bold text-2xl"> PhD in Mathematics</h2>
          <p className="text-sm ">
            John has over 10 years of experience in teaching math at various
            levels.
          </p>
        </div>
      </div>
    </>
  );
}

export default AllTutorCart;
