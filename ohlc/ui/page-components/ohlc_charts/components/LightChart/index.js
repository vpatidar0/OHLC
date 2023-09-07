import { createChart } from 'lightweight-charts';
import { useEffect,useState } from 'react';
import socketIOClient from 'socket.io-client';
const formattedDate=(timestamp)=>{
    const date = new Date(timestamp * 1000); // Convert to milliseconds
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1 and pad with '0'
const day = String(date.getDate()).padStart(2, '0');
return`${year}-${month}-${day}`;
}
const LightChart = () => {
    const [klineData, setKlineData] = useState({});

  useEffect(() => {
    const socket = socketIOClient('https://demo-live-data.highcharts.com/aapl-ohlcv.json'); // Replace with your server URL

    socket.on('KLINE', (data) => {
      setKlineData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(klineData,'klineData')
  useEffect(() => {
    const fetchData=async()=>{
        const response = await fetch(
            `https://demo-live-data.highcharts.com/aapl-ohlcv.json`
          );
          const data = await response.json();
          const cdata = data.map(d => {
            return {time:formattedDate(d[0]/1000+1000),open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
          }).slice(0, 10);
          const value=data.map((i=>{
            return {time:i[0]/1000}
          }))
          console.log( ...cdata,'cdata',value)
          const chartOptions = {
            layout: {
              textColor: 'black',
              background: { type: 'solid', color: 'white' },
            },
          };
      
          const chartContainer = document.getElementById('contain');
          if (chartContainer) {
            const chart = createChart(chartContainer, chartOptions);
            const areaSeries = chart.addAreaSeries({
              lineColor: '#2962FF',
              topColor: '#2962FF',
              bottomColor: 'rgba(41, 98, 255, 0.28)',
            });
            // areaSeries.setData([
            //     { time: '2022-08-22', value: 32.51 },
            //     { time: '2022-08-23', value: 31.11 },
            //     { time: '2022-08-24', value: 27.02 },
            //     { time: '2022-08-25', value: 27.32 },
            //     { time: '2022-08-26', value: 25.17 },
            //     { time: '2023-08-27', value: 28.89 },
            //     { time: '2023-08-28', value: 25.46 },
            //     { time: '2023-08-29', value: 23.92 },
            //     { time: '2023-08-30', value: 22.68 },
            //     { time: '2023-09-31', value: 25772 },
            // ]);
      
            const candlestickSeries = chart.addCandlestickSeries({
              upColor: '#26a69a',
              downColor: '#ef5350',
              borderVisible: false,
              wickUpColor: '#26a69a',
              wickDownColor: '#ef5350',
            });
            candlestickSeries.setData([
                { time: '2022-08-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
                { time: '2022-08-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
                { time: '2022-08-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
                { time: '2022-08-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
                { time: '2022-08-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
                { time: '2023-08-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
                { time: '2023-08-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
                { time: '2023-08-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
                // { time: '2023-08-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
                // { time: '2023-09-06', open:25774, high: 25772, low: 25774, close:25771 },
                ...cdata


            ]);
      
            chart.timeScale().fitContent();
          }

    }
   
    fetchData()
  }, []);

  return <div id='contain' style={{ width: '100%', height: '400px' }} />;
};

export default LightChart;
