import styles from '../styles.module.css'
import Progress from 'react-progressbar';
const Body=({data=[],pointData=[]})=>{
 return <div>  {
    data.map((item) => {
            return <div className={styles.head} key={item}>
                {pointData.map((point) => {
                    return <div className={styles.value} key={point}>{item?.[point]}  <ProgressBar color="#FFAAAA" color2="#550000" value="250" maxValue="250" rotation="270" /></div>
                })}
            </div>
        })
    }</div>
}
export default Body;