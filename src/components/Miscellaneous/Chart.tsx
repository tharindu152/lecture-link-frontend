import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb.tsx';
import ChartOne from '../Charts/ChartOne.tsx';
import ChartThree from '../Charts/ChartThree.tsx';
import ChartTwo from '../Charts/ChartTwo.tsx';

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
