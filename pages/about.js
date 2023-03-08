import React, { useEffect, useRef } from "react";
import Chart, { BubbleDataPoint, ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartItem, ChartTypeRegistry, Point } from "chart.js/auto";
import 'chartjs-adapter-date-fns';
import { months } from "moment";

export default function App() {
  const canvasEl = useRef(null);
let ctx: ChartItem;
let config: ChartConfiguration<keyof ChartTypeRegistry, (number | Point | [number, number] | BubbleDataPoint)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | Point | [number, number] | BubbleDataPoint)[], unknown>;
  
const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  useEffect(() => {
    const canvasEl = document.createElement('canvas');
    const ctx = canvasEl.getContext('2d');
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, "#00f000");
    gradient.addColorStop(0.65, "#f0fff0");
    gradient.addColorStop(1, "#f0fff0");

    const days = [
      {  x: Date.parse('2023-03-02'), y: 23},
      {  x: Date.parse('2023-03-03'), y: 65},
      {  x: Date.parse('2023-03-04'), y: 34},
      {  x: Date.parse('2023-03-05'), y: 36},
      {  x: Date.parse('2023-03-06'), y: 18},
      {  x: Date.parse('2023-03-07'), y: 53},
      {  x: Date.parse('2023-03-08'), y: 85},
    ];

    const weeks = [ 
    {  x: Date.parse('2023-03-09'), y: 18},
    {  x: Date.parse('2023-03-16'), y: 58},
    {  x: Date.parse('2023-03-25'), y: 3},
    {  x: Date.parse('2023-04-1'), y: 28},
    ];
    
    const months = [
    {  x: Date.parse('2023-01-02'), y: 18},
    {  x: Date.parse('2023-02-03'), y: 100},
    {  x: Date.parse('2023-03-04'), y: 23},
    {  x: Date.parse('2023-04-05'), y: 45},
    {  x: Date.parse('2023-05-06'), y: 56},
    {  x: Date.parse('2023-06-07'), y: 23},
    {  x: Date.parse('2023-07-08'), y: 87},
    {  x: Date.parse('2023-08-09'), y: 45},
    {  x: Date.parse('2023-09-016'), y: 47},
    {  x: Date.parse('2023-10-25'), y: 48},
    {  x: Date.parse('2023-11-1'), y: 86},
    {  x: Date.parse('2023-12-1'), y: 18},
  ];

   /* const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10"
    ];*/

    const data = {
      labels: 'weekly sales',
      datasets: [
        {
          backgroundColor: gradient,
          label: "My Portfolio P/L",
          data: days,
          fill: false,
          borderWidth: 3,
          borderColor: "#00c900",
          lineTension: 0.2,
          pointBackgroundColor: "#00c900",
          pointRadius: 5
        }
      ]
    };
    const config = {
      type: "bar",
      data: data,
      options: { maintainAspectRatio: true, responsive:true,
        scales:{
          x:{
            adapters: {
              type: 'time',
              time: {
                unit:'day'
              }
          },
          y:{
            beginAtZero:true
          }
       }
    },
  };
   
   
  });
  function switchTo(period) {
    const myLineChart = new Chart(ctx, config);

    console.log(period.value)
    if(period.value == 'day'){
      myLineChart.config.options.scales.x.adapters.time.unit = period.value;
      myLineChart.config.data.datasets[0].data = days;
    }
    if(period.value == 'week'){
      myLineChart.config.options.scales.x.adapters.time.unit = period.value;
      myLineChart.config.data.datasets[0].data = weeks;
    }
    if(period.value == 'month'){
      myLineChart.config.options.scales.x.adapters.time.unit = period.value;
      myLineChart.config.data.datasets[0].data = months;
    }
    myLineChart.update();
  }
  return (
    <div className="display:flex justify-content: center  items-align: center ">
      <button onClick={() =>switchTo(this)} value="day">Daily/</button>
      <button onClick={() =>switchTo(this)} value="week">Weekly/</button>
      <button onClick={() =>switchTo(this)} value="month">Montlhy</button>
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}
