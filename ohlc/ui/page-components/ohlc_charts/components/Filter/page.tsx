
import control from '@/ui/page-components/constant/filter';
import styles from './styles.module.css';
import Select from '../../../../common/select'
const options = [
    { value: 'tBTCUSD', label: 'BTC/USD' },
    { value: 'tLTCUSD', label: 'LTC/USD' },
    { value: 'tETHUSD', label: 'ETH/USD' },
];

const Filter = ({ filter, setFilter }) => {

    const onClickFilter = (item) => {
        setFilter((prev) =>
            ({ ...prev, 'time': item.value }))
    }
    return <div className={styles.container}>
        {control.map((item) => {
            return <div key={item.value} role='presentation'
                onClick={() => onClickFilter(item)}
                className={`${styles.button} 
                ${item.value === filter.time && styles.active}`} >{item.title}</div>
        })}

        <Select options={options} onChange={(e) => onClickFilter(e)} />
    </div>
}
export default Filter;