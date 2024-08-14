// eslint-disable-next-line import/no-extraneous-dependencies
import ReactApexChart from 'react-apexcharts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ApexOptions } from 'apexcharts';

const WkBattingGraph = ({ battings }: { battings: number[] | undefined }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 240,
      toolbar: {
        show: true,
      },
    },
    colors: ['#111111'],
    dataLabels: {
      enabled: false,
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
          fontSize: '11px',
        },
      },
      categories: [
        '~100P',
        '~200P',
        '~300P',
        '~400P',
        '~500P',
        '~600P',
        '~700P',
        '~800P',
        '~900P',
        '~1000P',
        '1000P~',
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '10px',
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 10,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'dark',
    },
    plotOptions: {
      bar: {
        columnWidth: '25%',
        borderRadius: 2,
      },
    },
  };
  const series = [
    {
      name: 'Battings',
      data: battings || [],
    },
  ];
  return (
    <div className="relative flex flex-col rounded-xl border bg-white text-gray-700 shadow-md">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="bar"
        height={220}
      />
    </div>
  );
};

export default WkBattingGraph;
