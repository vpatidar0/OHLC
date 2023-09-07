import styles from './styles.module.css'
const control = [
    { time: 3, type: 'y', labal: '3y', parma: '1W',page:630 },
    { time: 1, type: 'y', labal: '1y', parma: '1D',page:630 },
    { time: 3, type: 'M', labal: '3m', parma: '12h',page:330 },
    { time: 1, type: 'M', labal: '1m', parma: '6h',page:330 },
    { time: 7, type: 'd', labal: '7d', parma: '1h',page:330 },
    { time: 3, type: 'd', labal: '3d', parma: '30m',page:330 },
    { time: 1, type: 'd', labal: '1d', parma: '15m',page:330 },
    { time: 6, type: 'h', labal: '6h', parma: '5m',page:330 },
    { time: 1, type: 'h', labal: '1h', parma: '1m',page:330 },

]
const FilterButton = ({ handleIntervalChange, selectedInterval }) => {
    return <div className={styles.button_box}>
        {control.map((item) => {
            return <div key={item.time} onClick={() => handleIntervalChange(item)}
                className={item.labal === selectedInterval.labal ? styles.active : ''}>{item.labal}</div>
        })}

    </div>
}
export default FilterButton;