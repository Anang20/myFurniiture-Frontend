import Head from 'next/head'
import Image from 'next/image'
import beranda from '../public/images/beranda.png'
import styles from '../styles/Home.module.css'
import Navbar from './components/navbar'


export default function Home() {
  return (
    <div>
    <Navbar/>
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6'>
          <div className={styles.beranda}>
            <h1 className={styles.title}>Beli Produk <small className={styles.furniture}>Furniture</small></h1>
            <h1 className={styles.title}>Sesuai Apa Yang Anda inginkan</h1>
            <button className={styles["button-belanja-sekarang"]}>Belanja Sekarang</button>
          </div>
        </div>
        <div className='col-md-6 d-none d-lg-block'>
            <Image className={styles["image-beranda"]} src={beranda}></Image>
        </div>
      </div>
    </div>
    </div>
  )
}
