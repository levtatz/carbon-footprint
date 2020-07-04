import React from 'react';
import { Bar } from '@ant-design/charts';

export const Chart = ({ data }) => {
  const config = {
    forceFit: true,
    data,
    xField: 'emissions',
    yField: 'category',
  };
  return <Bar {...config} />;
};
