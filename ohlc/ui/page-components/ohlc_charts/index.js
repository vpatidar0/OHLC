"use client";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "react-query/devtools";
import Chart from "./components/Chart";
import Book from "./components/Book";
import useCandlestick from "./hooks/useCandlestick";
import { useState } from "react";
import useFetchData from "./hooks/usefetchData";
import TradingView from "../trading-view/components/page";
import Header from "./components/Header/page";
import LightChart from './components/LightChart/page'
const MAPPING = {
  hollowcandlestick: useCandlestick,
  ohlc: useFetchData,
};

const OHLC = () => {
  const [chartType, setChartType] = useState('hollowcandlestick');
  const [selectType, setSelcetType] = useState('Chart')
  const fun = MAPPING[chartType];

  if (!fun) {
    return null;
  }
  const { optionData, setFilter = () => { }, filter = {} } = fun();
  const renderMapping = {
    // 'Chart': <Chart
      // optionData={optionData}
      // setFilter={setFilter}
      // filter={filter}
      // setChartType={setChartType}
      // chartType={chartType}
    // />,
    'Chart':<LightChart/>,
    'Book': <Book filter={filter} />,
    "TradingView": <TradingView />
  }
  const Component = renderMapping[selectType] || null

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header setSelcetType={setSelcetType} selectType={selectType} setFilter={setFilter} />
        
        {Component ? Component : null}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};
export default OHLC;
