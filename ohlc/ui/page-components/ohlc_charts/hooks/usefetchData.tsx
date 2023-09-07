import { useEffect,useState } from "react";
import Highcharts from 'highcharts/highstock';
import { getCandlesList } from '@/ui/api/get';

type OHLCData = [number, number, number, number, number];
type VolumeData = [number, number];
type OptionData = {
    open: number;
    high: number;
    low: number;
    close: number;
    negative: boolean;
};

const useFetchData=()=>{
  const [filter,setFilter]=useState({time:'1m',select:'tBTCUSD'})
    const [zoomRange, setZoomRange] = useState(null);
    const [optionData, setOptionData] = useState<OptionData | null>(null);

    const handleZoom = (event) => {
        setZoomRange(event.min)
    };

  
    


 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-pub.bitfinex.com/v2/candles/trade%3A${filter.time}%3A${filter.select}/hist`
        );
        const data = await response.json();

        const ohlc: OHLCData[] = [];
        const volume: VolumeData[] = [];
        for (let i = 0; i < data.length; i += 1) {
          ohlc.push([
            data[i][0], 
            data[i][1], 
            data[i][2], 
            data[i][3], 
            data[i][4], 
          ]);

          volume.push([
            data[i][0],
            data[i][5], 
          ]);
        }

        Highcharts.stockChart('container', {
            xAxis: {
                labels: {
                    style: {
                        color: '#8b969f',
                    },
                },
                events: {
                    afterSetExtremes: function (e) {
                        handleZoom(e);
                    },
                },
    
            },
          yAxis: [
            {
              labels: {
                align: 'left',
                style: {
                    color: '#8b969f',
                },
              },
              height: '80%',
              resize: {
                enabled: true,
              },
            },
            {
              labels: {
                align: 'left',
              },
              top: '80%',
              height: '20%',
              offset: 0,
            },
          ], chart: {
            backgroundColor: '#172d3e',
        },
          tooltip: {
            enabled: false,
          },
          plotOptions: {
            series: {
                point: {
                    events: {
                        mouseOver: function (event: { target }) {
                            const dataPoint = event.target;
                            setOptionData(dataPoint)

                        }
                    },
                },
            },
        },
          navigator: {
            enabled: false
        },
          series: [
            {
              type: 'ohlc',
              id: 'aapl-ohlc',
              name: 'AAPL Stock Price',
              data: ohlc,
            },
            {
              type: 'column',
              id: 'aapl-volume',
              name: 'AAPL Volume',
              data: volume,
              yAxis: 1,
            },
          ],
          rangeSelector: {
            enabled: false },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 800,
                },
                chartOptions: {
                  rangeSelector: {
                    inputEnabled: false,
                  },
                },
              },
            ],
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filter]); 
  return {optionData,setFilter,filter}
 }
 export default useFetchData