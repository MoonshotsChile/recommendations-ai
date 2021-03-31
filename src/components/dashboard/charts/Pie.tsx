import React from "react";
import { Pie, defaults } from "react-chartjs-2";
import { ChartData, ChartOptions } from "../entity/ChartData";

// defaults.global.tooltips.enabled = true;
// defaults.global.legend.position = "bottom";
interface PropsComponent {
  data: ChartData;
  options: any;
}
const BarChart = (props: PropsComponent): JSX.Element => {
  return (
    <div>
      <Pie data={props.data} options={props.options} />
    </div>
  );
};

export default BarChart;
