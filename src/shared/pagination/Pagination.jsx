import PropTypes from "prop-types";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

function Pagination({ totalCount, perPageData, activePage, setActivePage }) {
  const perPageDataCount = Math.ceil(totalCount / perPageData);
  const countedButton = [...Array(perPageDataCount).keys()];
  return (
    <>
      <div className="flex justify-center space-x-1 ">
        <button
          onClick={() => {
            if (activePage > 0) {
              setActivePage(activePage - 1);
            }
          }}
          title="previous"
          type="button"
          className="my-transition hover:bg-primary hover:text-white inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md "
        >
          <IoArrowBack></IoArrowBack>
        </button>
        {countedButton.map((num) => {
          return (
            <button
              key={num}
              type="button"
              onClick={() => {
                setActivePage(num);
              }}
              className={`${
                activePage === num && "border-primary text-white bg-primary"
              } my-transition hover:bg-primary hover:text-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md `}
            >
              {num + 1}
            </button>
          );
        })}

        <button
          onClick={() => {
            if (countedButton.length > activePage + 1) {
              setActivePage(activePage + 1);
            }
          }}
          title="next"
          type="button"
          className="my-transition hover:bg-primary hover:text-white inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md "
        >
          <IoArrowForward></IoArrowForward>
        </button>
      </div>
    </>
  );
}
Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  perPageData: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
export default Pagination;
