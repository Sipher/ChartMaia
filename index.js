#! /usr/bin/env node
const ChartJSNode = require('chartjs-node-canvas');
const ChartJSNodeCanvas = ChartJSNode.ChartJSNodeCanvas
const ChartCallBack =  ChartJSNode.ChartCallBack
//ChartJSNodeCanvas, ChartCallback 
const ChartConfig = require('chart.js');
const ChartConfiguration = ChartConfig.ChartConfiguration
const fs  = require('fs');

async function main()  {
  const array = JSON.parse(process.argv[2]);

	const width = 1920;
	const height = 1080;
	const configuration = {
		type: 'line',
		data: {
      labels:
        Array.from({length: array.length}, (_, i) => i + 1), 
			datasets: [{
        label: false,
				data: array,
        backgroundColor: [
          //'rgba(255, 99, 132, 0.2)',
          'rgba(0, 0, 0, 0.5)', // as bolinhas
					//'rgba(54, 162, 235, 0.2)',
					//'rgba(255, 206, 86, 0.2)',
					//'rgba(75, 192, 192, 0.2)',
					//'rgba(153, 102, 255, 0.2)',
					//'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
					//'rgba(255,99,132,1)',
            'rgba(0, 0, 0, 0.5)', // as linhas
					////'rgba(54, 162, 235, 1)',
					////'rgba(255, 206, 86, 1)',
					////'rgba(75, 192, 192, 1)',
					////'rgba(153, 102, 255, 1)',
					////'rgba(255, 159, 64, 1)'
        ],
				borderWidth: 1
			}]
		},

		options: {
      plugins: {
        legend: {
          display: false
        },
      },
		},
		plugins: [{
			id: 'background-colour',
			beforeDraw: (chart) => {
				const ctx = chart.ctx;
				ctx.save();
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, width, height);
				ctx.restore();
			}
		}]
	};
	const chartCallback = (ChartJS) => {
		ChartJS.defaults.responsive = true;
		ChartJS.defaults.maintainAspectRatio = false;
    ChartJS.defaults.font.size = 40;
	};
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
	const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
	fs.writeFileSync('./example.png', buffer, 'base64');
}
main();
