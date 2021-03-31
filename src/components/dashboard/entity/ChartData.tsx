export interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}
export interface ChartOptions {
  scales?: { yAxes: { ticks: { beginAtZero: boolean } }[] };
  title: any;
  legend: any;
}
