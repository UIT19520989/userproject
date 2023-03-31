import { Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import './Echart.scss';

const { Title } = Typography;

function EChart() {
    const allUsers = useSelector((state) => state.user.user?.allUsers);
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    allUsers?.forEach((element) => {
        ++data[Number(element.createdAt.slice(5, 7)) - 1];
    });

    const eChart = {
        series: [
            {
                name: 'Number of users',
                data: data,
                color: '#fff',
            },
        ],

        options: {
            chart: {
                type: 'bar',
                width: '100%',
                height: 'auto',

                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['transparent'],
            },
            grid: {
                show: true,
                borderColor: '#ccc',
                strokeDashArray: 2,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
                    },
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: [
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                            '#fff',
                        ],
                    },
                },
            },

            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
        },
    };

    return (
        <>
            <div id="chart">
                <ReactApexChart
                    className="bar-chart"
                    options={eChart.options}
                    series={eChart.series}
                    type="bar"
                    height={300}
                />
            </div>
            <div className="chart-vistior">
                <Title level={5}>Number of Users by month</Title>
            </div>
        </>
    );
}

export default EChart;
