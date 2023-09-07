import { createChart } from 'lightweight-charts';
import { useEffect, useState, useRef } from 'react';

import styles from './styles.module.css'
import { calculateOptionsForInterval } from '@/ui/page-components/hepler';
import FilterButton from './FilterButton/page';
import Select from "@/ui/common/select";
import { options } from '../../../constant/filter'
import { CURMAPPING } from '@/ui/page-components/constant';
const LightChart = () => {
  const [selectedInterval, setSelectedInterval] = useState( {time:1,type:'h',labal:'1h',parma:'1m'},);
  const [selectFilter, setSelectFilter] = useState('tBTCUSD')
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const areaSeriesRef = useRef(null)
  const candlestickSeriesRef = useRef(null)
  const [toolTipValue, setToolTipValue] = useState({})

  const fetchData = async () => {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/candles/trade%3A${selectedInterval.parma}%3A${selectFilter}/hist`
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
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      };
    });
    if (!chartRef.current) {
      const chartOptions = {
        layout: {
          textColor: 'black',
          background: { type: 'solid', color: 'white' },
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
    // areaSeriesRef.current.setData(dataTime.sort((a, b) => a.time - b.time));
    candlestickSeriesRef.current.setData(cdata.sort((a, b) => a.time - b.time));

    chartRef.current.timeScale().fitContent();

    chartRef.current.subscribeCrosshairMove((param) => {

      if (param !== undefined && param.time !== undefined) {
        const currentTime = param.time;

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
            value: (close - open).toFixed(2),
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
    // chartRef.current.timeScale().setVisibleRange(visibleRange);
  };


  useEffect(() => {
    fetchData()
  }, [selectedInterval,selectFilter]);

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };
  const { open, high, low, close, color, value } = toolTipValue || {}
  const style = { color: color, padding: '0px 5px 0px 2px' }
  return <div>
    <div className={styles.head_box}>
      <div className={styles.title}>
      <div className={styles.heading}>{CURMAPPING[selectFilter]}</div>
        <div>O <span style={style}> {open}</span></div>
        <div>H<span style={style} >{high}</span></div>
        <div>L<span style={style}> {low}</span></div>
        <div>C<span style={style}> {close}</span></div>
        <div style={style}>{value}</div>
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
    <div ref={chartContainerRef} id='contain' style={{ width: '100%', height: '400px' }} />
    <FilterButton handleIntervalChange={handleIntervalChange} selectedInterval={selectedInterval} />
  </div>;
};

export default LightChart;
