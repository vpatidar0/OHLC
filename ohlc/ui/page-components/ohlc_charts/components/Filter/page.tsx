
import control from '@/ui/page-components/constant/filter';
import Select from 'react-select';
const options = [
    { value: 'tBTCUSD', label: 'BTC/USD' },
    { value: 'tLTCUSD', label: 'LTC/USD' },
    { value: 'tETHUSD', label: 'ETH/USD' },
];
import styles from './styles.module.css'
const Filter = ({ filter, setFilter }) => {


    return <div className={styles.container}>
        {control.map((item) => {
            return <div onClick={() => { setFilter((prev) => ({ ...prev, 'time': item.value })) }} className={`${styles.button} ${item.value === filter.time && styles.active}`} >{item.title}</div>
        })}
        <Select
            value={filter.select}
            onChange={(e) => { setFilter((prev) => ({ ...prev, 'select': e })) }}
            options={options}
        /></div>
}
export default Filter;