"use client"
import React from 'react';
import Highcharts from 'highcharts/highstock';
import 'highcharts/css/annotations/popup.css';
import HighchartsStock from 'highcharts/modules/stock';

import styles from './styles.module.css'
HighchartsStock(Highcharts);
import Filter from '../Filter/page';
import useCandlestick from '../../hooks/useCandlestick'
const Chart = () => {

  const {optionData,setFilter,filter}=useCandlestick()
  const { negative = false, barX } = optionData || {}
  return (
    <div className={styles.container}>
      <div className={styles.filter_box}>
      {optionData && (
        <div>
        <div className={styles.box}>
          <p>{filter.select.label}</p>
          <p>O<span className={!negative ? styles.hight : styles.low}>{optionData.open}</span> </p>
          <p>H<span className={!negative ? styles.hight : styles.low}>{optionData.high}</span> </p>
          <p>L<span className={!negative ? styles.hight : styles.low}>{optionData.low}</span> </p>
          <p>C<span className={!negative ? styles.hight : styles.low}>{optionData.close}</span></p>
        </div>
       {barX&& <div className={styles.box}>Valome:{barX.toFixed(2)}</div>}
        </div>
      )}
      <Filter filter={filter} setFilter={setFilter}/>
      </div>
      <div className={styles. chart_wrapper}>

      <div id="container" className={styles.chart}></div>
      </div>

    </div>
  );
};

export default Chart;
