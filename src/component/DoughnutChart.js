import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend,Title);
const DoughnutChart = (props) => {

    const options={
        plugins: {
          title: {
            display: true,
            text: "Travaux selon leur appréciation",
            align: "center",
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: true,
            position: "top",
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      }
    return (
        <div>
            <div>
                {props.data!==null && props.data!==undefined && <Doughnut options={options} data={props.data}/>}
            </div>
        </div>
    );
};

export default DoughnutChart;