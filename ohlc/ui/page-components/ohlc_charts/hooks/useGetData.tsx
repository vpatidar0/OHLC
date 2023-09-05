import { useQuery } from "@/packages/request/hooks/useQuery";
import { getCandlesList } from '@/ui/api/get';
import { Options } from 'highcharts';

import { useState } from "react";

type OHLCData = [number, number, number, number, number];
type VolumeData = [number, number];
type OptionData = {
    open: number;
    high: number;
    low: number;
    close: number;
    negative: boolean;
    barX:number;
};

const useGetData = () => {
    const [zoomRange, setZoomRange] = useState(null);
    const [optionData, setOptionData] = useState<OptionData | null>(null);

    const ohlc: OHLCData[] = [];
    const volume: VolumeData[] = [];

    const handleZoom = (event) => {
        setZoomRange(event.min)
    };

    const { data } = useQuery({
        queryKey: 'get_data',
        renderOption: [zoomRange],
        payload: { end: zoomRange, limit: 100 },
        queryFn: getCandlesList,
        options: {
            refetchOnMount: true,
        },
    });

    var dataLength = data?.length,
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
                            setOptionData(dataPoint)

                        }
                    },
                },
            },
        },

        stockTools: {
            gui: {
                enabled: false
            }
        },

      
        accessibility: {
            enabled: true,
        },
        navigator: {
            enabled: false
        },
        series: [{
            type: 'ohlc',
            id: 'ohlc',
            name: 'Stock Price',
            data: ohlc
        }, {
            type: 'column',
            id: 'volume',
            name: 'Volume',
            data: volume,
            yAxis: 1
        }],
        responsive: {
            rules: [{
              condition: {
                maxWidth: 800
              },
              chartOptions: {
                rangeSelector: {
                  inputEnabled: false
                }
              }
            }]
          }

    }
    return { data, setZoomRange, options, optionData };
};

export default useGetData;
