import useAuth from "../../hooks/useAuth";

function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="cursor-pointer relative group">
      <img
        className="rounded-full size-14 object-cover ring-1 ring-primary p-1"
        src={user?.photoURL}
        alt="userPhoto"
      />
      <div className="hidden group-hover:inline-block absolute -top-[80px] md:top-auto md:bottom-[-80px]  md:right-0 z-10 bg-white text-black rounded-md shadow-sm p-4">
        <span className="font-bold font-roboto text-primary">
          {user?.displayName}
        </span>
        <h2 className="font-medium text-sm text-primary-main">{user?.email}</h2>
      </div>
    </div>
  );
}

export default UserProfile;
