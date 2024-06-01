import PropTypes from "prop-types";
function SectionTitle({ firstCls, secondCls }) {
  return (
    <>
      <h2 className={`text-3xl ${firstCls} font-bold`}>
        Study <span className={secondCls}>Session</span>
      </h2>
      <p className="text-sm font-medium text-slate-900">
        Our study sessions are designed to help you master your subjects through
        collaboration and expert guidance.
      </p>
    </>
  );
}

SectionTitle.propTypes = {
  firstCls: PropTypes.string,
  secondCls: PropTypes.string,
};
export default SectionTitle;
