import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdPersonSearch } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import DataLoader from "./../../shared/data_loader/DataLoader";
import ErrorDataImage from "./../../shared/error_data_image/ErrorDataImage";

function AllUsers() {
  // user search name or email
  const [searchNameOrEmail, setSearchNameOrEmail] = useState(null);

  const axiosSecure = useAxiosSecure();
  // all users data get
  const {
    isPending,
    error,
    data: allUsersData = [],
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?userFilter=${searchNameOrEmail && searchNameOrEmail}`
      );
      const data = await res.data;
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, searchNameOrEmail]);

  // handle update role
  const handleUpdateRole = (userData) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c6bc0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, admin it!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const res = await axiosSecure.patch(`/update-role`, {
          _id: userData._id,
          email: userData.email,
        });
        const data = await res.data;
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Role Updated Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  // handle user search
  const handleUserSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const userSearch = form.userFind.value;
    setSearchNameOrEmail(userSearch);
    form.reset();
  };
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | All Users</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-primary"}
            secondCls={"text-black"}
            firstName={"Explore Our"}
            secondName={"Learning Community"}
            description={
              "Here, you can discover profiles, connect with peers, and engage with experts who share your academic interests. Browse through user profiles to find study partners, join study groups, and build a network that supports your educational journey. This section is designed to foster collaboration, knowledge sharing, and a sense of community among all users."
            }
          ></SectionTitle>
        </div>
        {isPending && (
          <div className="flex justify-center py-12 ">
            <DataLoader></DataLoader>
          </div>
        )}
        {error && (
          <div className="flex flex-col spacey-2 justify-center items-center">
            <ErrorDataImage></ErrorDataImage>
            <span className="text-red-500">
              An error has occurred: {error.message}
            </span>
          </div>
        )}
        {allUsersData.length > 0 && (
          <>
            <div className="flex justify-between items-center pb-6">
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 ">
                  All Users:
                </h2>

                <span className="px-3 py-1 text-xs font-bold text-primary bg-blue-200 rounded-full  ">
                  {allUsersData.length}
                </span>
              </div>
              <form
                onSubmit={(e) => {
                  handleUserSearch(e);
                }}
                className="relative flex items-center mt-4 md:mt-0"
              >
                <MdPersonSearch className="text-2xl absolute ml-2 text-primary"></MdPersonSearch>

                <input
                  name="userFind"
                  type="text"
                  placeholder="Search User Name/Email"
                  className="block w-full py-1.5 pr-5 text-primary bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-primary  focus:ring-primary-main focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </form>
            </div>

            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr className="*:font-bold">
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Name</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Role
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Email address
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Update Role
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {allUsersData.map((userData, ind) => {
                          const { photo, name, email, role } = userData;

                          return (
                            <tr key={ind}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span className="text-white bg-primary rounded-full size-3 flex justify-center items-center p-3">
                                    {ind + 1}
                                  </span>

                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="object-cover size-10 rounded-full ring-1 ring-primary p-1"
                                      src={photo}
                                      alt={name}
                                    />
                                    <div>
                                      <h2 className="font-medium text-gray-800 ">
                                        {name}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap capitalize">
                                {role}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                {email}
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                {role === "admin" ? (
                                  <div
                                    className={`cursor-pointer flex items-center space-x-2 justify-center px-3 py-1 text-xs text-primary rounded-full  bg-blue-100/60  `}
                                  >
                                    <RiAdminFill></RiAdminFill>
                                    <span>Already Admin</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => {
                                      handleUpdateRole(userData);
                                    }}
                                    className={`cursor-pointer flex items-center space-x-2 justify-center px-3 py-1 text-xs text-primary my-transition rounded-full  bg-blue-100/60 hover:bg-primary/50 hover:text-black`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                    <span>Update</span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default AllUsers;
