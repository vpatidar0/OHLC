
import control from '@/ui/page-components/constant/filter';
import Select from 'react-select';
import styles from './styles.module.css';

const options = [
    { value: 'tBTCUSD', label: 'BTC/USD' },
    { value: 'tLTCUSD', label: 'LTC/USD' },
    { value: 'tETHUSD', label: 'ETH/USD' },
];

const Filter = ({ filter, setFilter }) => {


    return <div className={styles.container}>
        {control.map((item) => {
            // eslint-disable-next-line react/jsx-key
            return <div role='presentation' 
                onClick={() => { setFilter((prev: any) => 
                ({ ...prev, 'time': item.value })) }} 
                className={`${styles.button} 
                ${item.value === filter.time && styles.active}`} >{item.title}</div>
        })}
        <Select
            value={filter.select}
            onChange={(e) => { setFilter((prev) => ({ ...prev, 'select': e })) }}
            options={options}
            className="basic-single"
            classNamePrefix="select"
            name="color"
        /></div>
}
export default Filter;