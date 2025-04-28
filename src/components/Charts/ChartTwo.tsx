import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { useData } from '../../context/MainContext.tsx';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    max:4,
    floating: false,
    decimalsInFloat: 0
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      //@ts-ignore
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[] | undefined;
}

const ChartTwo: React.FC = () => {
  // @ts-ignore
  const data: InstituteRes  = useData();

  function getSubjectNames(data: InstituteRes): string[] {
    if (!data?.programs) {
      return [];
    }
    return data?.programs?.flatMap(program => program?.subjects ? program?.subjects?.map(subject => subject?.name) : []);
  }

  // @ts-ignore
  options.xaxis.categories = getSubjectNames(data);

  useEffect(() => {
    handleReset();
  }, []);

  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Credits',
        data: data?.programs?.flatMap(program =>
          program.subjects ? program.subjects.map(subject => subject.noOfCredits) : []
        ) || [],
      }
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Subject Credit Values
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
