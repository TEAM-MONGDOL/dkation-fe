// eslint-disable-next-line import/no-extraneous-dependencies
import ReactApexChart from 'react-apexcharts';

const WkPointGraph = () => {
  const chartOptions = {
    series: [
      {
        name: 'Points',
        data: [150, 40, 320],
      },
    ],
    chart: {
      type: 'bar',
      height: 240,
      toolbar: {
        show: true,
      },
    },
    title: {
      show: '',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#020617'],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: [
        '당첨자 최소 포인트',
        '당첨자 최대 포인트',
        '당첨자 평균 포인트',
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {},
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div className="relative flex flex-col rounded-lg rounded-xl border bg-white text-gray-700 shadow-md">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={220}
      />
    </div>
  );
};

export default WkPointGraph;
