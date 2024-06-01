import PropTypes from "prop-types";
function Button({ name, children }) {
  return (
    <>
      <button className="group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-primary px-8 py-2 text-neutral-50 flex justify-between items-center gap-2">
        <span className="relative z-10">{name}</span>
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-primary-main transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
        </span>
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
export default Button;
