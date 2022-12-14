import Head from 'next/head'
import Image from 'next/image';
import beranda from '../public/images/beranda.png';
import styles from '../styles/Home.module.css';
import Navbar from './components/Navbar';
import tentangKami from '../public/images/tentang-kami.png';
import Link from 'next/link';
import Footer from './components/footer';
import CardProduk from './components/card-produk';
import useAuthenticatedPage from '../helper/useAuthenticatedPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import appConfig from '../config/app';

const Index = () => {

  const [produk, setProduk] = useState([])

  useEffect(() => {
    const getProduk = async () => {
      const response = await axios.get(`${appConfig.apiUrl}/produk/`)
      const result = response.data.items
      setProduk(result)
    }
    getProduk()
  }, [])

  return (
    <>
    <Head>
      <title>MyFuniture</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head> 
    <div>
    <Navbar/>
    <div className={styles.wrapper}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 mt-5'>
            <div className={styles.beranda} id="beranda">
              <h1 className={styles.title}>Beli Produk <sb className={styles.furniture}>Furniture</sb><br/>
              Sesuai Apa Yang Anda inginkan
              </h1>
              <Link href="/auth/login">
              <button className={styles["button-belanja-sekarang"]}>Belanja Sekarang</button>
              </Link>
            </div>
          </div>
          <div className='col-md-6 d-none d-lg-block mt-5'>
              <Image className={styles["image-beranda"]} src={beranda} alt={"beranda"}></Image>
          </div>
        </div>
      </div>
      </div> 
    </div>

    {/* Tentang Kami */}
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-lg-6'>
          <Image src={tentangKami} width={450} height={430} alt={'tentang-kami'}/>
        </div>
        <div className='col-lg-6'>
          <h4 className={styles["title-tentang"]} id="tentang-kami">Tentang Kami</h4>
          <h4 className={styles["title2-tentang"]}>Kami Menyediakan Furniture Dengan Desain Terbaik</h4>
          <p className={styles["deskripsi-tentang"]}>Ubah ruangan anda dengan lebih banyak furnitur minimalis dan modern dengan mudah dan cepat</p>
          <div className='row'>
            <div className='col-lg-4'>
              <h4 className={styles["summary-tentang"]}>156+</h4>
              <p className={styles["summary-deskripsi"]}>Produk Furniture Pilihan</p>
            </div>
            <div className='col-lg-4'>
              <h4 className={styles["summary-tentang"]}>23</h4>
              <p className={styles["summary-deskripsi"]}>Desainer Profesional</p>
            </div>
            <div className='col-lg-4'>
              <h4 className={styles["summary-tentang"]}>475</h4>
              <p className={styles["summary-deskripsi"]}>Produk Furniture Terjual</p>
            </div>
            <Link href="/auth/login">
              <button className={styles["button-belanja-sekarang"]}>Belanja Sekarang</button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <CardProduk produk={produk}/>
    <Footer/>
  </>
  )
}

export default Index;
