import React from "react";
import ReactApexCharts from "react-apexcharts";
import PropTypes from 'prop-types';

const ApexChartComponent = (props) => {
  const { options = {}, series = [] } = props;
  const { type = "area", height = 350, width = "100%" } = props;
  const { children = null } = props;

  const renderWithChildren = () => (
    <ReactApexCharts
      options={options}
      series={series}
      width={width}
      height={height}
      type={type}
    >
      {children}
    </ReactApexCharts>
  );

  const renderWithoutChildren = () => (
    <ReactApexCharts
      options={options}
      series={series}
      width={width}
      height={height}
      type={type}
    />
  );

  return children ? renderWithChildren() : renderWithoutChildren();
};

ApexChartComponent.propTypes = {
  options: PropTypes.object,
  series: PropTypes.array,
  height: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.element
}

export default ApexChartComponent;
