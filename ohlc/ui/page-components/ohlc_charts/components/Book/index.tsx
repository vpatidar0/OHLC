"use client"
import { useState } from 'react'
import useBookData from '../../hooks/useBookData'
import styles from './styles.module.css'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import Heaedr from './Header';
import Body from './Body';
import { positiveDataPoint, negativeDataPoint } from '@/ui/page-components/constant';
const Book = () => {
    const { data = [] } = useBookData()

    const formatData = data.map((item) => ({ price: item?.[0], count: item?.[1], amount: item?.[2] }))

    const nagtive = formatData.filter((item) => item.amount < 0)

    const postive = formatData.filter((item) => item.amount > 0)

    const [show, setShow] = useState(true)
    return <div className={styles.cantiner}>
        <div className={styles.header} onClick={() => setShow((prev) => !prev)}>
            {show ? <BiChevronDown />
                :
                <BiChevronRight />} Order Book <span className={styles.ti}>BTC/USD</span>
        </div>
        {show ? <div>
            <div className={styles.head}>
                <Heaedr pointData={positiveDataPoint} />
                <Heaedr pointData={negativeDataPoint} />

            </div>
            <div className={styles.card}>
                <div>

                    <Body data={postive} pointData={positiveDataPoint} />

                </div>
                <div>

                    <Body data={nagtive} pointData={negativeDataPoint} />
                </div>
            </div>
        </div> : null}
    </div>
}
export default Book;