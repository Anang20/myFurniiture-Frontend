import styles from '../../styles/Home.module.css';
import almari from './../../public/images/almari.png';
import Image from 'next/image';

const CardProduk = () => {
    return (
        <>
        <div className='container'id="produk" style={{ marginTop: 147 }}>
            <div className='row'>
                <div className={styles["title-content"]}>
                    <h4>Produk</h4>
                </div>

                <div className={styles.card}>
                    <div className={styles['card-content']}>
                        <Image src={almari} alt="produk" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                        <div className={styles['desc-card']}>
                            <h5>Almari Minimalis</h5>
                            <p>Rp 300.000</p>
                        </div>
                    </div>
                    <div className={styles['card-content']}>
                        <Image src={almari} alt="produk" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                        <div className={styles['desc-card']}>
                            <h5>Almari Minimalis</h5>
                            <p>Rp 300.000</p>
                        </div>
                    </div>
                    <div className={styles['card-content']}>
                        <Image src={almari} alt="produk" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                        <div className={styles['desc-card']}>
                            <h5>Almari Minimalis</h5>
                            <p>Rp 300.000</p>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles['card-content']}>
                        <Image src={almari} alt="produk" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                        <div className={styles['desc-card']}>
                            <h5>Almari Minimalis</h5>
                            <p>Rp 300.000</p>
                        </div>
                    </div>
                    <div className={styles['card-content']}>
                        <Image src={almari} alt="produk" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                        <div className={styles['desc-card']}>
                            <h5>Almari Minimalis</h5>
                            <p>Rp 300.000</p>
                        </div>
                    </div>
                    <div className={styles['card-content']}>
                        <Image src={almari} alt="produk" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                        <div className={styles['desc-card']}>
                            <h5>Almari Minimalis</h5>
                            <p>Rp 300.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CardProduk;