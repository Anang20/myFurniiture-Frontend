import Footer from "./components/footer"
import NavbarCustomer from "./components/navbar_customer"
import styles from "../styles/Home.module.css";
import Image from "next/image";
import almari from "../public/images/almari.png"
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const Cart = () => {
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
        <Head>
            <title>MyFuniture | Keranjang</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavbarCustomer/>
        <div className="container-fluid" style={{ backgroundColor: '#ECEEEE' }}>
            <div className="container" style={{ backgroundColor: '#ECEEEE' }}>
                <div className="row">
                    <div className="col-lg-7">
                        <div className="card" style={{ marginTop: 120, borderRadius: 0}}>
                            <div className="card-body d-flex align-items-center justify flex-row" style={{ borderBottom: '3px solid rgba(0, 0, 0, 0.09)' }}>
                                <input type="checkbox"/><span className="ml-2 ">Pilih Semua</span>
                                <button className={styles["delete-cart"]}>Hapus</button>
                            </div>
                            <div className="card-body d-flex align-items-center">
                                <input type="checkbox"/>
                                <Image src={almari} width={130} height={130} alt={'almari'} className="ml-2"style={{ marginTop: 10, marginBottom: 10, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', borderRadius: '4px' }}/>
                                <div className="ml-5">
                                    <h4>Almari Minimalis</h4>
                                    <span>Rp 3.000.000</span>
                                </div>
                                <div className={styles["quantity-button-cart"]}>
                                    <button className={styles["decrement-count-cart"]} onClick={decrementCount}>-</button>
                                    <span className={styles["count-result-cart"]}>{count}</span>
                                    <button className={styles["increment-count-cart"]} onClick={incrementCount}>+</button>
                                </div>
                                <hr/>
                            </div>
                            <div className="card-body d-flex align-items-center">
                                <input type="checkbox"/>
                                <Image src={almari} width={130} height={130} alt={'almari'} className="ml-2"style={{ marginTop: 10, marginBottom: 10, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', borderRadius: '4px' }}/>
                                <div className="ml-5">
                                    <h4>Almari Minimalis</h4>
                                    <span>Rp 3.000.000</span>
                                </div>
                                <div className={styles["quantity-button-cart"]}>
                                    <button className={styles["decrement-count-cart"]} onClick={decrementCount}>-</button>
                                    <span className={styles["count-result-cart"]}>{count}</span>
                                    <button className={styles["increment-count-cart"]} onClick={incrementCount}>+</button>
                                </div>
                                <hr/>
                            </div>
                            <div className="card-body d-flex align-items-center">
                                <input type="checkbox"/>
                                <Image src={almari} width={130} height={130} alt={'almari'} className="ml-2"style={{ marginTop: 10, marginBottom: 10, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', borderRadius: '4px' }}/>
                                <div className="ml-5">
                                    <h4>Almari Minimalis</h4>
                                    <span>Rp 3.000.000</span>
                                </div>
                                <div className={styles["quantity-button-cart"]}>
                                    <button className={styles["decrement-count-cart"]} onClick={decrementCount}>-</button>
                                    <span className={styles["count-result-cart"]}>{count}</span>
                                    <button className={styles["increment-count-cart"]} onClick={incrementCount}>+</button>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5" style={{ marginTop: 120 }}>
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <label>Total Belanja</label><label className="ml-5">Rp 10.000.000</label><br/>
                                    <label>Total Pesanan</label><label className="ml-5">2</label><br/>
                                    <Link href="/transaksi/order">
                                    <button className={styles["button-lanjut-pembayaran"]}>Lanjutkan Ke Pembayaran</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Cart;