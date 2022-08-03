import NavbarCustomer from "./components/navbar_customer";
import Image from "next/image";
import almari from "../public/images/almari.png"
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faHand, faHandHolding } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const DetailProduk = () => {

    const [count, setCount] = useState(0)

    const decrementCount = () => {
        if (count > 0 ) {
            setCount(prevCount => prevCount - 1)
        }
    }

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }


    return (
        <>
        <NavbarCustomer/>
        <div className="container" style={{ position: 'relative', marginTop: 120, minHeight: '100%' }}>
            <div className="row">
                <div className="col-lg-6">
                    <Image src={almari} width={400} height={380} alt={'almari'}/>
                </div>
                <div className="col-lg-6">
                    <form method="POST" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input type="hidden" value=""/>
                        <label style={{ position: 'absolute', fontStyle: 'normal', fontWeight: 600, fontSize: 30, top: 80 }}>Almari Minimalis</label>
                        <input type="hidden" value=""/>
                        <label style={{ position: 'absolute', fontStyle: 'normal', fontWeight: 500, fontSize: 30, top: 180 }}>Rp 7.000.000</label>
                        <input type="hidden" value=""/>
                        <input type="hidden" value={count}/>
                        <Link href="./cart">
                            <button className={styles["button-tambah-keranjang"]}>Tambah Ke Keranjang</button>
                        </Link>
                    </form>
                    <div className={styles["quantity-button"]}>
                        <button className={styles["decrement-count"]} onClick={decrementCount}>-</button>
                        <span className={styles["count-result"]}>{count}</span>
                        <button className={styles["increment-count"]} onClick={incrementCount}>+</button>
                    </div>
                </div>
                <h5 className={styles["deskripsi-title"]}>Self Pickup</h5>
                <div className="col-lg-7 d-flex">
                    <div className="col-lg-2">
                        <FontAwesomeIcon
                        icon={faHandHolding}
                        style={{ width: 64, height: 40, marginLeft: -20 }}
                        />
                    </div>
                    <div className="col-lg-5" style={{ marginLeft: -40 }}>
                        <small className={styles.deskripsi}>Anda dapat mengambil barang pada lokasi kami</small>
                    </div>
                </div>
                <h5 className={styles["deskripsi-title"]}>Detail Produk & Spesifikasi</h5>
                <div className="col-lg-12">
                    <p className={styles.deskripsi}>
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Material : plastik HDPE, rangka powder coated steel
                    Dimensi produk : 47 x 56 x 86 cm
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Material : plastik HDPE, rangka powder coated steel
                    Dimensi produk : 47 x 56 x 86 cm
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Material : plastik HDPE, rangka powder coated steel
                    Dimensi produk : 47 x 56 x 86 cm
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    Serbaguna, bisa untuk kebutuhan area umum
                    Ideal untuk penggunaan di outdoor
                    Tahan kondisi cuaca, warna tidak mudah luntur
                    Ringan, mudah dilipat dan bisa disusun
                    Kapasitas beban : 150 kg
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
        </>        
    );
}
export default DetailProduk;