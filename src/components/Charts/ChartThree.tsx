import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { useData } from '../../context/MainContext.tsx';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#8FD0EF', '#6577F3'],
  labels: ['With lecturer', 'With out lecturer'],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          value: {
            formatter(val: string): string {
              return Number(val).toFixed(2) + "%";
            },
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  // @ts-ignore
  const data: InstituteRes = useData();

  function countSubjects(data: InstituteRes): number {
    if (!data?.programs) {
      return 0;
    }

    return data?.programs?.reduce((total, program) => {
      return total + (program.subjects ? program.subjects.length : 0);
    }, 0);
  }

  function countAssignedSubjects(data: InstituteRes): number {
    if (!data?.programs) {
      return 0;
    }

    return data?.programs?.reduce((total, program) => {
      return total + (program.subjects ? program.subjects.filter(subject => subject.isAssigned).length : 0);
    }, 0);
  }

  const [state, setState] = useState<ChartThreeState>({
    series: [(countAssignedSubjects(data)/countSubjects(data)*100), (countSubjects(data) - countAssignedSubjects(data))/countSubjects(data)*100],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [
        Number((countAssignedSubjects(data)/countSubjects(data)*100).toFixed(2)),
        Number(((countSubjects(data) - countAssignedSubjects(data))/countSubjects(data)*100).toFixed(2))
      ],
    }));
  };
  handleReset;

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Subjects Breakdown
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="mx-15 flex flex-wrap items-center justify-center gap-y-3">
        {state.series.map((percentage, index) => (
          <div key={index+percentage} className="flex w-full items-center mt-2">
            <span className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[${
              // @ts-ignore
              options.colors[index]}]`}></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> {
                // @ts-ignore
                options.labels[index]} </span>
              <span> {percentage.toFixed(2)}% </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
