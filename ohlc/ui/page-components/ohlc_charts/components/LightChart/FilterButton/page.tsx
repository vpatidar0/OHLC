import styles from './styles.module.css'
const control=[
    {time:3,type:'y',labal:'3y',parma:'1D'},
    {time:1,type:'y',labal:'1y',parma:'1D'},
    {time:3,type:'M',labal:'3m',parma:'12h'},
    {time:1,type:'M',labal:'1m',parma:'6h'},
    {time:7,type:'d',labal:'7d',parma:'1h'},
    {time:3,type:'d',labal:'3d',parma:'30m'},
    {time:1,type:'d',labal:'1d',parma:'15m'},
    {time:6,type:'h',labal:'6h',parma:'5m'},
    {time:1,type:'h',labal:'1h',parma:'1m'},

]
const FilterButton=({handleIntervalChange,selectedInterval})=>{
    return <div className={styles.button_box}>
        {control.map((item)=>{
            return<div key={item.time} onClick={() => handleIntervalChange(item)}
             className={item.labal===selectedInterval.labal?styles.active:''}>{item.labal}</div>
        })}

    </div>
}
export default FilterButton;