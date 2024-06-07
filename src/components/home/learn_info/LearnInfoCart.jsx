import PropTypes from "prop-types";

function LearnInfoCart({ count, name }) {
  return (
    <div className="space-y-3 flex flex-col items-center justify-center text-center">
      <h3 className="text-3xl md:text-4xl lg:text-[70px] font-semibold">
        {count}+
      </h3>
      <span className="font-midium text-xl md:text-2xl lg:text-3xl">
        {name}
      </span>
    </div>
  );
}
LearnInfoCart.propTypes = {
  count: PropTypes.number,
  name: PropTypes.string,
};
export default LearnInfoCart;
