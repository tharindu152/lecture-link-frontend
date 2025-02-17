import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import ChartOne from '../../components/Charts/ChartOne.tsx';
import ChartThree from '../../components/Charts/ChartThree.tsx';
import ChartTwo from '../../components/Charts/ChartTwo.tsx';

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
