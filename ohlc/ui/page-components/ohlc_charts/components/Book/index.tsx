"use client"
import { useState } from 'react'
import useBookData from '../../hooks/useBookData'
import styles from './styles.module.css'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import Heaedr from './Header';
import Body from './Body';
import { positiveDataPoint, negativeDataPoint } from '@/ui/page-components/constant';
const Book = ({filter}) => {
    const [show, setShow] = useState(true)
    const { orderBook } = useBookData({filter})

    const {asks,bids}=orderBook||{}

    let total=0
    const nagtive = asks
    .map((item) => {
        total +=item.amount 
        return { ...item, total:Math.abs(total) };
      });
    
    let totalPostive=0
    const postive = bids
      .map((item) => {
        totalPostive +=item.amount 
          return { ...item, 'total':Math.abs(totalPostive) };
        });
            

    return <div className={styles.cantiner}>
        <div className={styles.header} onClick={() => setShow((prev) => !prev)}>
            {show ? <BiChevronDown />
                :
                <BiChevronRight />} Order Book <span className={styles.ti}>{filter.select.label}</span>
        </div>
        {show ? <div>
            <div className={styles.head}>
                <Heaedr pointData={positiveDataPoint} />
                <Heaedr pointData={negativeDataPoint} />

            </div>
            <div className={styles.card}>
                <div>

                    <Body data={postive} pointData={positiveDataPoint} name='postiveColor'/>

                </div>
                <div>

                    <Body data={nagtive} pointData={negativeDataPoint} name='negativeColor' />
                </div>
            </div>
        </div> : null}
    </div>
}
export default Book;