import styles from '../../styles/Home.module.css';
import almari from './../../public/images/almari.png';
import Image from 'next/image';
import appConfig from '../../config/app';

const CardProduk = ({ produk }) => {
    return (
        <>
        <div className='container'id="produk" style={{ marginTop: 147 }}>
            <div className='row'>
                <div className={styles["title-content"]}>
                    <h4>Produk</h4>
                </div>

                {produk?.map((value, key) => {
                    return (
                        <>
                        <div className='col-lg-4 col-xl-4 col-sm-12 col-md-12' key={key}>
                            <div className='card mt-4'>
                                <Image src={`${appConfig.apiUrl}/file/${value.gambar}`} width={281} height={250} alt="image not found" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                                <div className='card-body'>  
                                    <div className={styles['desc-card']}>
                                        <h5>{value.nama_produk}</h5>
                                        <p>Rp {value.harga}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })}
           

                {/* <div className={styles.card}>
                    {produk?.map((value, key) => {
                        return (
                            <div key={key} className={styles['card-content']}>
                                <Image src={`${appConfig.apiUrl}/file/${value.gambar}`} width={118} height={118} alt="image not found" style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
                                <div className={styles['desc-card']}>
                                    <h5>{value.nama_produk}</h5>
                                    <p>Rp {value.harga}</p>
                                </div>
                            </div>
                        )
                    })} */}
                    {/* <div className={styles['card-content']}>
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
                    </div> */}
                {/* </div> */}
                {/* <div className={styles.card}>
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
                </div> */}
            </div>
        </div>
        </>
    )
}
export default CardProduk;