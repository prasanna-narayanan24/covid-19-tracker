import React from "react";
import Proptypes from "prop-types";

const CustomSuspense = (props) => {
  const {
    dataToValidate = null,
    validationCriteria = CustomSuspense.vc.NOT_NULL,
  } = props;
  const { fallBackComponent, children } = props;

  let shouldRenderChildren = false;
  switch (validationCriteria) {
    case CustomSuspense.vc.NOT_NULL:
      shouldRenderChildren = dataToValidate !== null;
      break;
    case CustomSuspense.vc.NOT_EMPTY:
      shouldRenderChildren =
        dataToValidate &&
        dataToValidate !== "" &&
        dataToValidate !== {} &&
        dataToValidate !== [];
      break;
    default:
      shouldRenderChildren = false;
  }

  if (shouldRenderChildren) {
    return <>{children}</>;
  }

  return <>{fallBackComponent}</>;
};



CustomSuspense.vc = {
    NOT_NULL: "not_null",
    NOT_EMPTY: "not_empty",
  };

CustomSuspense.propTypes = {
  fallBackComponent: Proptypes.any.isRequired,
  children: Proptypes.element.isRequired,
  dataToValidate: Proptypes.any,
  validationCriteria: Proptypes.oneOf(Object.values(CustomSuspense.vc)),
};

CustomSuspense.defaultProps = {
  dataToValidate: null,
  validationCriteria: CustomSuspense.vc.NOT_NULL
}

export default CustomSuspense;
