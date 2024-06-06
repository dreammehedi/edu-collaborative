import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Button from "../../shared/button/Button";

function ManagePersonalNoteCart({ manageNote, dataRefetch }) {
  const {
    _id,
    studentName,
    studentEmail,
    studentImage,
    noteTitle,
    noteDescription,
  } = manageNote;

  const axiosSecure = useAxiosSecure();

  // handle update create note
  const handleUpdateCreateNote = (id) => {
    console.log(id);
  };

  //   handle create note delete
  const handleCreateNoteDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c6bc0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-create-note/${id}`);
        const data = await res.data;
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Note Deleted Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          dataRefetch();
        } else {
          Swal.fire({
            title: "Note Not Deleted",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <>
      <div className="shadow-md p-4 rounded-md space-y-3">
        <img
          className="w-full h-[200px] object-cover"
          src={studentImage}
          alt=""
        />
        <div className="flex justify-between items-center text-primary font-medium text-xs">
          <h2>{studentName}</h2>
          <p>{studentEmail}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{noteTitle}</h2>
          <p className="font-medium text-xs">{noteDescription}</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div
            onClick={() => {
              handleUpdateCreateNote(_id);
            }}
            className="text-[13px]"
          >
            <Button name={"Update"}></Button>
          </div>
          <div
            onClick={() => {
              handleCreateNoteDelete(_id);
            }}
            className="text-[13px]"
          >
            <Button name={"Delete"}></Button>
          </div>
        </div>
      </div>
    </>
  );
}

ManagePersonalNoteCart.propTypes = {
  manageNote: PropTypes.object,
  dataRefetch: PropTypes.func,
};
export default ManagePersonalNoteCart;
