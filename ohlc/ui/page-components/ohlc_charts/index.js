"use client";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "react-query/devtools";
import Book from "./components/Book";
import { useState } from "react";
import TradingView from "../trading-view/components/page";
import Header from "./components/Header/page";
import LightChart from './components/LightChart/page'

const OHLC = () => {
  const [selectType, setSelcetType] = useState('Chart')

 
  const renderMapping = {
    'Chart':<LightChart/>,
    'Book': <Book  />,
    "TradingView": <TradingView />
  }
  const Component = renderMapping[selectType] || null

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header setSelcetType={setSelcetType} selectType={selectType} />
        
        {Component ? Component : null}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};
export default OHLC;
