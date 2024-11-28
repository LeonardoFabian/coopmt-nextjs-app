import { Pie } from "react-chartjs-2";

export function Chartjs2Pie(props) {
  const { options, data } = props;

  return <Pie data={data} options={options} />;
}
