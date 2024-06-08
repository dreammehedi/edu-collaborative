import PropTypes from "prop-types";
function SectionTitle({
  firstCls,
  secondCls,
  firstName,
  secondName,
  description,
}) {
  return (
    <>
      <h2
        className={`text-xl md:text-2xl lg:text-3xl ${firstCls} h-full font-bold flex flex-col md:flex-row justify-center items-center gap-1`}
      >
        <div className="hidden md:inline-block !h-8 w-1 bg-primary-main"></div>
        {firstName} <div className="md:hidden !h-1 w-8 bg-primary-main"></div>
        <span className={`inline-block ${secondCls}`}>{secondName}</span>
      </h2>
      <p className="text-sm font-medium text-slate-900">{description}</p>
    </>
  );
}

SectionTitle.propTypes = {
  firstCls: PropTypes.string,
  secondCls: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  description: PropTypes.string,
};
export default SectionTitle;
