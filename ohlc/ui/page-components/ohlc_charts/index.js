/* eslint-disable react/react-in-jsx-scope */
"use client"
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();
import { ReactQueryDevtools } from 'react-query/devtools';
import Chart from './components/Chart';
import Book from './components/Book'
import useCandlestick from './hooks/useCandlestick'

const OHLC = () => {
  const {optionData,setFilter,filter}=useCandlestick()

  return <div>
    <QueryClientProvider client={queryClient}>
      <Chart optionData={optionData} setFilter={setFilter} filter={filter}/>
      <Book filter={filter}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </div>
}
export default OHLC