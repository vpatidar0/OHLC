const TIMEMAPPING={
    '6h':6,
    '15m':15,
    '30m':30,
    '1h':1,
    '3h':3,
    '1M':1,
    '14D':14,
    '1d':1,
    '3d':3
  }

export const calculateOptionsForInterval = (inter) => {
    const {type,time}=inter||{}
  
    let tickMarkFormatter;
    let visibleRange;
  
  switch (type) {
    case 'm':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const hours = date.getHours() % 12 || 12; 
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        return `${hours}:${minutes} ${ampm}`;
      };
      visibleRange = { from:time, to: 0 }; // Show last 1 hour
      break;
  
    case 'h':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const hours = date.getHours() % 12 || 12; 
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; 
        return `${hours}${ampm}`;
      };
      visibleRange = { from: -time * 60 * 60, to: 0 }; 
      break;
  
    case 'd':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const month = date.toLocaleString('default', { month: 'short' });
        return `${date.getDate()} ${month}`;
      };
      visibleRange = { from: -time*24 * 60 * 60, to: 0 }; 
      break;
  
    case 'M':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const month = date.toLocaleString('default', { month: 'short' });
        return `${month} ${date.getFullYear()}`;
      };
      visibleRange = { from: -time * 30 * 24 * 60 * 60, to: 0 }; 
      break;
    case 'y':
        tickMarkFormatter = (time) => {
          const date = new Date(time * 1000);
          return date.getFullYear().toString();
        };
        visibleRange = { from: -time * 365 * 24 * 60 * 60, to: 0 };
        break;
  
    default:
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        return date.toISOString().split('T')[0];
      };
      visibleRange = { from: -time  * 60 * 60, to: 0 }; 
      break;
  };
  return {tickMarkFormatter,visibleRange}
  }