import React, { useEffect, useState } from "react";
import API from "../../utils/RequestUtil";
import ApexChartComponent from "../../common/component/ApexChartComponent";
import { parseDate } from "../../utils/CommonUtils";
import CustomSuspense from "../../common/component/CustomSuspense";
import { CircularProgress } from "@material-ui/core";

const DataVisualization = (props) => {
  const [seriesData, setSeriesData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const onSuccess = (res) => {
      const dailyData = res;
      let xAxis = { categories: [] };

      xAxis.categories = Object.keys(dailyData["cases"]).map(k => parseDate(k, false));

      let chartDataMap = {};
      Object.keys(dailyData).forEach((objectKey) => {
        chartDataMap[objectKey] = Object.values(dailyData[objectKey]);
      });

      const chartData = [
        {
          name: "confirmed",
          data: chartDataMap["cases"],
        },
        {
          name: "recovered",
          data: chartDataMap["recovered"],
        },
        {
          name: "deaths",
          data: chartDataMap["deaths"],
        },
      ];

      const chartOptions = {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: { ...xAxis },
      };

      setSeriesData(chartData);
      setOptions(chartOptions);
    };

    const onFail = (err) => {
      console.error(err);
    };

    API.call("/v2/historical/all", onSuccess, onFail);
  }, []);

  return (
    <CustomSuspense
      dataToValidate={seriesData}
      fallBackComponent={CircularProgress}
      validationCriteria={CustomSuspense.vc.NOT_EMPTY}
    >
      <ApexChartComponent options={options} series={seriesData} />
    </CustomSuspense>
  );
};

export default React.memo(DataVisualization);
