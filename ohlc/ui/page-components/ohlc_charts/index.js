"use client"
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();
import { ReactQueryDevtools } from 'react-query/devtools';
import Chart from './components/Chart';
import Book from './components/Book'
const OHLC = () => {
  return <div>
    <QueryClientProvider client={queryClient}>
      <Chart />
      <Book />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </div>
}
export default OHLC