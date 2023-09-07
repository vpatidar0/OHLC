import styles from './styles.module.css'
const Select = ({ options,onChange }) => {
  return (
    <div >
      <select onChange={(e) => onChange(e.target.value)} className={styles.container}>
        {options.map((item) => {
          return <option value={item.value}>{item.label}</option>;
        })}
      </select>
    </div>
  );
};
export default Select;
