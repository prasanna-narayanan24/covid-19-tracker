
// import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from './Title';

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

// export default function Chart() {
//   const theme = useTheme();

//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
//           <YAxis stroke={theme.palette.text.secondary}>
//             <Label
//               angle={270}
//               position="left"
//               style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
//             >
//               Sales ($)
//             </Label>
//           </YAxis>
//           <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }

import React from "react";
import Chart from 'react-apexcharts'


const ChartComponent = props => {
    const options = {
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
    };
    const series = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }, {
        name: 'series-2',
        data: [38, 32, 53, 42, 57, 52, 78, 83]
    }, {
        name: 'series-3',
        data: [22, 48, 38, 58, 41, 68, 62, 99]
    }]

    return <Chart options={options} series={series} type="area" height={300}> Chart title </Chart>

}

export default ChartComponent;