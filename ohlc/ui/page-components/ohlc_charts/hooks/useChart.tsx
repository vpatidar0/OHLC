import { calculateOptionsForInterval } from '@/ui/page-components/hepler';
import { useEffect, useState, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';

interface ToolTipValue {
  open: number;
  high: number;
  low: number;
  close: number;
  color: string;
  value: string;
  vloume: number;
  percentageChange: string;
}
const useChart = () => {
  const [selectedInterval, setSelectedInterval] = useState({
    time: 1,
    type: 'h',
    labal: '1h',
    parma: '1m',
    page: '330'
  },);

  const [selectFilter, setSelectFilter] = useState('tBTCUSD')
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const areaSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
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
    const dataTime = data.map((item) => {
      return { time: item[0] / 1000, value: item[5] }
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
            color: '#385062',
          },
          horzLines: {
            color: '#385062',
          },
        },
        priceScale: {
          borderColor: '#385062'
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
      // const histogramSeries = chart.addHistogramSeries({ color: '#26a69a' });
      // histogramSeries.setData(dataTime.sort((a, b) => a.time - b.time));
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
    candlestickSeriesRef.current?.setData(cdata.sort((a, b) => a.time - b.time));

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
            open: Math.ceil(open),
            high: Math.ceil(high),
            low: Math.ceil(low),
            close: Math.ceil(close),
            vloume: Math.ceil(volumeValue),
            color: color,
            value: ((high - low +1 ) >= 0 ? ' +' : '') + (high - low+1).toFixed(2),
            percentageChange: `${(((high - low) / low) * 100).toFixed(2)}%`
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

    chartRef.current.timeScale().setVisibleRange(visibleRange);
  };
  useEffect(() => {
    fetchData()
  }, [selectedInterval, selectFilter]);

  return { selectedInterval, chartContainerRef, setSelectedInterval, setSelectFilter, toolTipValue, selectFilter }
}
export default useChart;