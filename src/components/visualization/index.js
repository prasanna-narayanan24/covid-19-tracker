import React, { useEffect, useState } from "react";
import API from "../../utils/RequestUtil";
import ApexChartComponent from "../../common/component/ApexChartComponent";
import { parseDate } from "../../utils/CommonUtils";
import { CircularProgress, Paper } from "@material-ui/core";

const DataVisualization = (props) => {
  const [seriesData, setSeriesData] = useState(null);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const onSuccess = (res) => {
      const dailyData = res || [];
      const spread = 4;

      let chartDataMap = {};
      Object.keys(dailyData).forEach((objectKey) => {
        const obj = dailyData[objectKey]
        const outPutData = Object.entries(obj).reverse().filter((_, i) => i % spread === 0).reverse()
        chartDataMap[objectKey] = outPutData.map(k => ({ x: parseDate(k[0], false), y: k[1] }));
      });

      const chartData = [
        {
          name: "CONFIRMED",
          data: chartDataMap["cases"],
        },
        {
          name: "RECOVERED",
          data: chartDataMap["recovered"],
        },
        {
          name: "DEATHS",
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
        xaxis: {
          labels: {
            format: "dd/MM"
          }
        },
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
    seriesData ? <Paper><ApexChartComponent options={options} series={seriesData} /></Paper> : <CircularProgress />
  );
};

export default React.memo(DataVisualization);
