"use client"
import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import 'highcharts/css/annotations/popup.css';
import HighchartsStock from 'highcharts/modules/stock';
import { Options } from 'highcharts';

import styles from './styles.module.css'
import { useState, useRef } from 'react';
HighchartsStock(Highcharts);
import useGetData from '../../hooks/useGetData';
type OptionData = {
  open: number;
  high: number;
  low: number;
  close: number;
  negative: boolean;
};

type OHLCData = [number, number, number, number, number];
type VolumeData = [number, number];

const Chart = () => {
  const [optionData, setOptionData] = useState<OptionData | null>(null);

  const chartRef = useRef(null);

  const { data = [], setZoomRange } = useGetData()

  const { negative = false } = optionData || {}


  const ohlc: OHLCData[] = [];
  const volume: VolumeData[] = [];

  var  dataLength = data.length,
    i = 0;

  for (i; i < dataLength; i += 1) {
    ohlc.push([
      data[i][0],
      data[i][1],
      data[i][2],
      data[i][3],
      data[i][4]
    ]);

    volume.push([
      data[i][0],
      data[i][5]
    ]);
  }

  const handleZoom = (event: { min: 0; max: React.SetStateAction<null>; }) => {
    const newZoomRange = {
      min: event.min,
      max: event.max,
    };
    setZoomRange(event.max)
  };

  const options: Options = {
    chart: {
      backgroundColor: '#172d3e',
    },
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
    yAxis: [{
      labels: {

        style: {
          color: '#8b969f',
        },
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        style: {
          color: '#8b969f',
        },
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    },
    ],

    plotOptions: {
      candlestick: {
        color: 'red',
        upColor: 'green',
        lineColor: 'white',
      },
      series: {
        point: {
          events: {
            mouseOver: function (event: { target }) {
              const dataPoint = event.target;
              chartRef.current = dataPoint
              setOptionData(dataPoint)

            },
            mouseOut: function (data: {}) {
              console.log(data, 'dat')
            },
          },
        },
      },
    },

    stockTools: {
      gui: {
        enabled: false
      }
    },
    tooltip: {
      enabled: false
    },
    accessibility: {
      enabled: true,
    },
    navigator: {
      enabled: false
  },
    series: [{
      type: 'ohlc',
      id: 'aapl-ohlc',
      name: 'AAPL Stock Price',
      data: ohlc
    }, {
      type: 'column',
      id: 'aapl-volume',
      name: 'AAPL Volume',
      data: volume,
      yAxis: 1
    }],
    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 800
    //         },
    //         chartOptions: {
    //             rangeSelector: {
    //                 inputEnabled: false
    //             }
    //         }
    //     }]
    // },

  }
  useEffect(() => {
    Highcharts.stockChart('container', {
      ...options
    });
  }, [data]);


  return (
    <div className={styles.container}>
      {optionData && (
        <div className={styles.box}>
          <p>BTC/USD</p>
          <p>O<span className={!negative ? styles.hight : styles.low}>{optionData.open}</span> </p>
          <p>H<span className={!negative ? styles.hight : styles.low}>{optionData.high}</span> </p>
          <p>L<span className={!negative ? styles.hight : styles.low}>{optionData.low}</span> </p>
          <p>C<span className={!negative ? styles.hight : styles.low}>{optionData.close}</span></p>
        </div>
      )}

      <div className={styles.chart_wrapper}>

        <div id="container" className={styles.chart}></div>
      </div>

    </div>
  );
};

export default Chart;
