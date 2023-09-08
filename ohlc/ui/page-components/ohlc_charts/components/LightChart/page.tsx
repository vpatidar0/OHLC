import { createChart } from 'lightweight-charts';
import { useEffect, useState, useRef } from 'react';

import styles from './styles.module.css'
import { calculateOptionsForInterval } from '@/ui/page-components/hepler';
import FilterButton from './FilterButton/page';
import Select from "@/ui/common/select";
import { options } from '../../../constant/filter'
import { CURMAPPING } from '@/ui/page-components/constant';
interface ToolTipValue {
  open: number; 
  high: number; 
  low: number; 
  close: number; 
  color: string; 
  value: string; 
  vloume:number;
  percentageChange:string;
}

const LightChart = () => {
  const [selectedInterval, setSelectedInterval] = useState( {time:1,type:'h',labal:'1h',parma:'1m',page:'330'},);
  const [selectFilter, setSelectFilter] = useState('tBTCUSD')
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const areaSeriesRef = useRef(null)
  const candlestickSeriesRef = useRef(null)
  const [toolTipValue, setToolTipValue] = useState<ToolTipValue | null>(null); 

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/candles/trade:${selectedInterval.parma}:${selectFilter}/hist?limit=${selectedInterval.page}`
    );
    const data = await response.json();
    const responseValue = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/stats1/pos.size:${selectedInterval.parma}:${selectFilter}:long/hist`
    );
    const dataValue = await responseValue.json();
    const dataTime = dataValue.map((item) => {
      return { time: item[0] / 1000, value: item[1] }
    })

    const cdata = data.map((d) => {
      return {
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        close: parseFloat(d[2]),
        high: parseFloat(d[3]),
        low: parseFloat(d[4]),
        
      };
    });
    if (!chartRef.current) {
      const chartOptions = {
        layout: {
          textColor: '#fff',
          background: { type: 'solid', color: '#172d3e' },
        },
        grid: {
          vertLines: {
            color:'#385062', 
          },
          horzLines: {
            color:'#385062', 
          },
        },
        priceScale:{
          borderColor:'#385062'
        },
        timeScale: {
          borderColor: '#385062'
        },
      };
     


      const chartContainer = chartContainerRef.current;

      const chart = createChart(chartContainer, chartOptions);
      const intervalOptions = calculateOptionsForInterval(
        selectedInterval
      );

      const areaSeries = chart.addAreaSeries({
        lineColor: '#2962FF',
        topColor: '#2962FF',
        bottomColor: 'rgba(41, 98, 255, 0.28)',
      });
      // areaSeries.setData(dataTime.sort((a, b) => a.time - b.time))

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      chartRef.current = chart;
      areaSeriesRef.current = areaSeries;
      candlestickSeriesRef.current = candlestickSeries;
    }
    candlestickSeriesRef.current.setData(cdata.sort((a, b) => a.time - b.time));

    chartRef.current.timeScale().fitContent();

    chartRef.current.subscribeCrosshairMove((param) => {

      if (param !== undefined && param.time !== undefined) {
        const currentTime = param.time;
       console.log(currentTime,'currentTime')
        const candleData = cdata.find((data) => data.time === currentTime);
        if (candleData) {
          const { open, high, low, close } = candleData;
          const volumeValue = candleData.v || 'N/A';
          const color = close >= open ? 'green' : 'red';
          setToolTipValue({
            open: open.toFixed(2),
            high: high.toFixed(2),
            low: low.toFixed(2),
            close: close.toFixed(2),
            vloume: volumeValue,
            color: color,
            value: ((close - open) >= 0 ? ' +' : '') + (close - open).toFixed(2),
            percentageChange : `${(((open - close) / close) * 100).toFixed(2)} %`
          })
        }
      }
    });
    const { tickMarkFormatter, visibleRange } = calculateOptionsForInterval(selectedInterval);
    chartRef.current.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: true,
      tickMarkFormatter,
    });

    const lastDataPoint = dataTime[dataTime.length - 1];
    chartRef.current.timeScale().setVisibleRange(visibleRange);
  };


  useEffect(() => {
    fetchData()
  }, [selectedInterval,selectFilter]);

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };
  const { open, high, low, close, color, value,percentageChange } = toolTipValue || {}

  const style = { color: color, padding: '0px 5px 0px 2px' }

  return <div className={styles.container}>
    <div className={styles.head_box}>
      <div className={styles.title}>
      <div className={styles.heading}>{CURMAPPING[selectFilter]}</div>
        <div className={styles.sub_type}>O<span style={style}> {open}</span></div>
        <div  className={styles.sub_type}>H<span style={style} >{high}</span></div>
        <div  className={styles.sub_type}>L<span style={style}> {low}</span></div>
        <div  className={styles.sub_type}>C<span style={style}> {close}</span></div>
        <div style={style}>{value} ({percentageChange})</div>
      </div>
      <div>
        <Select
          value={selectFilter}
          onChange={(e) => {
            setSelectFilter(e)
          }}
          options={options}
          name="select"
        />
      </div>
    </div>
    <div ref={chartContainerRef} id='contain' style={{ width: '100%', height: '395px' }} />
    <FilterButton handleIntervalChange={handleIntervalChange} selectedInterval={selectedInterval} />
  </div>;
};

export default LightChart;
