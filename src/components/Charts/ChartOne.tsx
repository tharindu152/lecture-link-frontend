import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { Program } from '../../types/instituteTypes/program.ts';
import { useData } from '../../context/MainContext.tsx';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE', '#FF5733', '#FFC300', '#28A745', '#E83E8C', '#6F42C1'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 0,
    decimalsInFloat: 0
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[] | undefined;
}

const ChartOne:  React.FC = () => {
  // @ts-ignore
  const data: InstituteRes  = useData();
  // @ts-ignore
  options.xaxis.categories = ["Duration (Days)", "Student Count", "Payment (LKR)"]
  const payments = data?.programs?.map((program : Program) => program?.payment);
  // @ts-ignore
  options.yaxis.max = Math.max(...payments ?? [])+10;

  const [state, setState] = useState<ChartOneState>({
    series: data?.programs?.flatMap((program: Program) => {
      return {
        name: program?.name,
        data: [program?.durationInDays, program?.studentCount, program?.payment],
      };
    })
  });

  useEffect(() => {
    console.log(state)
    handleReset();
  }, []);

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Program Comparison
          </h4>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
