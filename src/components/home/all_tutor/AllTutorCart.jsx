import PropTypes from "prop-types";

function AllTutorCart({ tutor }) {
  const { email, name, photo, role } = tutor;
  return (
    <>
      <div className="w-full overflow-hidden p-2 bg-white rounded-md shadow-md">
        <img
          className="object-cover  size-[120px] ring-2 ring-primary p-2 rounded-full mx-auto"
          src={photo}
          alt="avatar"
        />

        <div className="space-y-1 flex flex-col items-center justify-center text-center p-4 break-words">
          <span className="text-primary-main font-medium text-sm capitalize">
            {role}
          </span>
          <span className="font-medium text-primary text-[15px]">{name}</span>
          <h4 className="w-full font-bold text-[18px] break-words text-wrap">
            {email}
          </h4>
        </div>
      </div>
    </>
  );
}
AllTutorCart.propTypes = {
  tutor: PropTypes.object,
};

export default AllTutorCart;
