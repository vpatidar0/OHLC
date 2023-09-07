const Config=[
    'Chart','Book','TradingView'
]
import styles from './style.module.css'
const Header=({setSelcetType,selectType,setFilter})=>{
    return <div className={styles.container}>{Config.map((item)=>{
        return <div className={`${selectType===item ? styles.active:''} ${styles.text}`}  
        onClick={()=>{setSelcetType(item);setFilter((prev)=>({...prev,type:!prev.type}))}} 
        key={item}>{item}</div>
    })}</div>
}
export default Header;