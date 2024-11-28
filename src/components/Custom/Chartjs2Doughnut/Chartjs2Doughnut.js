import styles from "./Chartjs2Doughnut.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * A React component for rendering a doughnut chart using Chart.js.
 *
 * @param {{options: object, data: object, title: string}} props
 * @param {object} props.options - The options to pass to Chart.js.
 * @param {object} props.data - The data to pass to Chart.js.
 * @param {string} props.title - The title of the chart.
 * @returns {React.ReactElement}
 */
export function Chartjs2Doughnut(props) {
  const { options, data, title } = props;

  return (
    <div className={styles.chartjs2Doughnut}>
      <div className={styles.chartjs2DoughnutWrapper}>
        <h6 className={styles.title}>{title}</h6>
        <div className={styles.chartjs2DoughnutBox}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
