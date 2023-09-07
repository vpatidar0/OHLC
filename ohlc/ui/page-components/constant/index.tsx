export const positiveDataPoint = ["count", "amount", "total", "price"];
export const negativeDataPoint = ["price", "total", "amount", "count"];

export const CHARTTYPE = [
  { value: "hollowcandlestick", label: "hollowcandlestick" },
  { value: "ohlc", label: "OHLC" },
];

export const roundPrice = ({ item, point }) => {
  if (["amount", "total"].includes(point)) {
    return Math.abs(item?.[point]).toFixed(3);
  }
  return Math.abs(item?.[point]);
};

export const widthCal = ({ item, data }) => {
  return (item?.total / data[data.length - 1].total) * 100;
};

export const addTotal=({data})=>{
    let total=0
    return data
    .map((item) => {
        total +=item.amount 
        return { ...item, total:Math.abs(total) };
      });
}

export const CURMAPPING={
    'tBTCUSD':'BTC/USD',
    'tLTCUSD':'LTC/USD',
    'tETHUSD': 'ETH/USD',
}