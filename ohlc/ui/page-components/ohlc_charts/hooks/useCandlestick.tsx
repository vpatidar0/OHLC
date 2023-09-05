import { useEffect,useState } from "react";
import Highcharts from 'highcharts/highstock';

type OHLCData = [number, number, number, number, number];
type VolumeData = [number, number];
type OptionData = {
    open: number;
    high: number;
    low: number;
    close: number;
    negative: boolean;
};

const useCandlestick=()=>{
  const [filter,setFilter]=useState({time:'1m',select:  { value: 'tBTCUSD', label: 'BTC/USD' }})
    const [zoomRange, setZoomRange] = useState(null);
    const [optionData, setOptionData] = useState<OptionData | null>(null);

    const handleZoom = (event) => {
        setZoomRange(event.min)
    };


 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-pub.bitfinex.com/v2/candles/trade%3A${filter.time}%3A${filter.select.value}/hist`
        );
        const data = await response.json();


        // create the chart
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
    
            rangeSelector: {
                enabled: false },            series: [{
                name: 'AAPL',
                type: 'candlestick',
                data: data,
                tooltip: {
                    valueDecimals: 2
                },
                color: 'green',
                upColor: 'red', 
                // borderColor: '#fff',
            }],
            chart: {
                backgroundColor: '#172d3e',
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
 export default useCandlestick