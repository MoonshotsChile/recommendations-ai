import React from "react";
import { Doughnut, defaults } from "react-chartjs-2";
import { ChartData, ChartOptions } from "../entity/ChartData";

// defaults.global.tooltips.enabled = true;
// defaults.global.legend.position = "bottom";
interface PropsComponent {
  data: ChartData;
  options: ChartOptions;
}
const DoughnutChart = (props: PropsComponent): JSX.Element => {
  return (
    <div>
      <Doughnut data={props.data} options={props.options} />
    </div>
  );
};

export default DoughnutChart;
