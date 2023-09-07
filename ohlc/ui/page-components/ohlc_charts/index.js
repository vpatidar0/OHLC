"use client";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "react-query/devtools";
import Chart from "./components/Chart";
import Book from "./components/Book";
import useCandlestick from "./hooks/useCandlestick";
import { useState } from "react";
import useFetchData from "./hooks/usefetchData";
import LightChart from './components/LightChart';
const MAPPING = {
  hollowcandlestick: useCandlestick,
  ohlc: useFetchData,
};

const OHLC = () => {
  const [chartType, setChartType] = useState('hollowcandlestick');

  const fun = MAPPING[chartType];

  if (!fun) {
    return null;
  }
  const { optionData, setFilter = () => {}, filter = {} } = fun();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Chart
          optionData={optionData}
          setFilter={setFilter}
          filter={filter}
          setChartType={setChartType}
          chartType={chartType}
        />
        <Book filter={filter} />
        <LightChart/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};
export default OHLC;
