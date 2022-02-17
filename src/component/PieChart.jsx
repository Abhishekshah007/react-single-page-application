import React,{Component} from 'react';
import Chart from 'react-google-charts';
import {Tables} from './exportfiles';

function PieChart() {
  const data = [
    ["Task", "Hours per Day"],
    ["React 30%", 6],
    ["Express 30%", 6],
    ["NodeJs 30%", 6],
    ["MongoDB 10%", 2]
  ];
  const options = {
    pieHole: 0.4,
  };
  return (
  <>
  <div className="col-md-5">
  <div className="align-top">
       
  <Chart
  className="doughnut"
          chartType="PieChart"
          width="100%"
          height="283px"
          data={data}
          options={options}
        />
      </div>
  <Tables/>
  </div>
  </>
  );
}

export default PieChart;
