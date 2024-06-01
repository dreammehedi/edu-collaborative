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
      <h2 className={`text-3xl ${firstCls} font-bold`}>
        {firstName} <span className={secondCls}>{secondName}</span>
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
