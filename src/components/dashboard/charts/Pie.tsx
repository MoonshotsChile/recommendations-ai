import React from "react";
import { Pie, defaults } from "react-chartjs-2";
import { ChartData, ChartOptions } from "../entity/ChartData";

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = "bottom";
interface PropsComponent {
  data: ChartData;
}
const BarChart = (props: PropsComponent): JSX.Element => {
  return (
    <div>
      <Pie data={props.data} />
    </div>
  );
};

export default BarChart;
