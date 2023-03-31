import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import './LineChart.scss';
import { useSelector } from 'react-redux';
const { Title } = Typography;

function LineChart() {
    const allUsers = useSelector((state) => state.user.user?.allUsers);
    const dataAdmin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const dataUser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    allUsers?.forEach((element) => {
        element.isAdmin
            ? ++dataAdmin[Number(element.createdAt.slice(5, 7)) - 1]
            : ++dataUser[Number(element.createdAt.slice(5, 7)) - 1];
    });
    const lineChart = {
        series: [
            {
                name: 'Number of admins',
                data: dataAdmin,
                offsetY: 0,
            },
            {
                name: 'Number of users',
                data: dataUser,
                offsetY: 0,
            },
        ],

        options: {
            chart: {
                width: '100%',
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },

            legend: {
                show: false,
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },

            yaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 600,
                        colors: ['#8c8c8c'],
                    },
                },
            },

            xaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 600,
                        colors: [
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                            '#8c8c8c',
                        ],
                    },
                },
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Sep'],
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
            <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={lineChart.series}
                type="area"
                height={300}
                width={'100%'}
            />
            <div className="linechart">
                <Title level={5}>Number of Admin and User by month</Title>
            </div>
        </>
    );
}

export default LineChart;
