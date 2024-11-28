import styles from "./Chartjs2StackedBar.module.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Chartjs2StackedBar(props) {
  const { options, data, title } = props;

  return (
    <div className={styles.chartjs2StackedBar}>
      <div className={styles.chartjs2StackedBarWrapper}>
        <h6 className={styles.title}>{title}</h6>
        <div className={styles.chartjs2StackedBarBox}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
