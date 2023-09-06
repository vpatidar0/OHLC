import styles from '../styles.module.css'
const roundPrice=(item,point)=>{
    if(['amount','total'].includes(point)){
        return Math.abs(item?.[point]).toFixed(3)
    }
    return Math.abs(item?.[point])
}
const Body = ({ data, pointData,name='' }) => {
    return <div className={styles.body}>  {

        data.map((item) => {
            return <div className={styles.head} key={item.total}>
                <div className={styles[name]} style={{ width: `${(item?.total / data[data.length - 1].total) * 100}%`}}/>
                {(pointData||[]).map((point) => {
                    return <div className={styles.value} key={point}>{roundPrice(item,point)}
                    </div>
                })}
            </div>
        })
    }
   
    </div>
}
export default Body;