import React from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ApexChartProps {}

interface ApexChartState {
  series: Array<{ name: string; data: number[] }>;
  options: ApexOptions;
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: "Left Brake",
          data: [0, 5, 42, 77, 120, 212, 315, 430, 580],
        },
        {
          name: "Right Brake",
          data: [0, 3, 38, 76, 112, 177, 280, 390, 500],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled:false,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ['#f3832b', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'MSE of Brake Temperature Predictions on Unknown Data as Number of Predictions Increases',
          align: 'left',
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#e7e7e7', 'transparent'],
            opacity: 0.3,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: ['0', '25', '50', '75', '100', '125', '150', '175','200'],
          title: {
            text: 'Number of Predictions',
          },
        },
        yaxis: {
          title: {
            text: 'Mean Squared Error',
          },
          min: 0,
          max: 600,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;

const domContainer = document.querySelector('#app');
if (domContainer) {
  ReactDOM.render(<ApexChart />, domContainer);
}
