"use client"
import React from 'react';
import Highcharts from 'highcharts/highstock';
import 'highcharts/css/annotations/popup.css';
import HighchartsStock from 'highcharts/modules/stock';
import Select from 'react-select';
import styles from './styles.module.css'
HighchartsStock(Highcharts);
import Filter from '../Filter/page';
import {CHARTTYPE } from '../../../constant/index'
const Chart = ({optionData,filter,setFilter,setChartType,chartType}) => {

  const { negative = false, barX } = optionData || {}
  return (
    <div className={styles.container}>
      <div className={styles.filter_box}>
      {optionData && (
        <div className={styles.filter}>
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
      <div>
        <Select
            value={chartType}
            onChange={(e)=>{setChartType(e);setFilter((prev)=>({...prev,"type":!prev.type}))}}
            options={CHARTTYPE}
            name="chartType"
        />
        </div>
      <Filter filter={filter} setFilter={setFilter}/>
      </div>
      <div className={styles. chart_wrapper}>

      <div id="container" className={styles.chart}></div>
      </div>

    </div>
  );
};

export default Chart;
