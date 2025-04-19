import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useData } from '../../context/MainContext.tsx';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';

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
    max: 4,
    floating: false,
    decimalsInFloat: 0,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
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

const ChartTwoLec: React.FC = () => {
  // @ts-ignore
  const data: LecturerRes = useData();

  // Function to get subjects assigned to the lecturer
  function getSubjectNames(data: LecturerRes): string[] {
    if (!data?.subjects) {
      return [];
    }
    return data.subjects.map(subject => subject.name); // Assuming subjects is a direct property
  }

  // Function to get the number of credits for each subject
  function getCredits(data: LecturerRes): number[] {
    if (!data?.subjects) {
      return [];
    }
    return data.subjects.map(subject => subject.noOfCredits); // Assuming noOfCredits is a property of each subject
  }

  // @ts-ignore
  options.xaxis.categories = getSubjectNames(data);

  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Credits',
        data: getCredits(data), // Get credits for the assigned subjects
      },
    ],
  });

  useEffect(() => {
    handleReset();
  }, [data]); // Reset when data changes

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: 'Credits',
          data: getCredits(data), // Update credits when data changes
        },
      ],
    }));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            UnderTaken Subject Credit Values
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

export default ChartTwoLec;