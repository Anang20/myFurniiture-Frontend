import Footer from "../../components/footer"
import NavbarCustomer from "../../components/navbar_customer"
import styles from "/styles/Home.module.css";
import Image from "next/image";
import almari from "/public/images/almari.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import appConfig from "../../../config/app";
import axios from "axios";
import jwtDecode from "jwt-decode";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

const Cart = () => {
    const [count, setCount] = useState(0)
    const [cart, setCart] = useState([{
        kuantiti: 0,
        produk: {
            nama_produk: '',
            gambar: '',
            harga: 0,
        },
    }]);
    const [isChecked, setIsChecked] = useState(
        new Array()
    );

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const decrementCount = () => {
        if (count > 0 ) {
            setCount(prevCount => prevCount - 1)
        }
    }

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    useEffect(() => {
        const getDataCart = async () => {
            try {
                const token = localStorage.getItem('accessToken')
                const decode = jwtDecode(token)
                const userId = decode.query["id_user"]
                const endpoint = `${appConfig.apiUrl}/cart/cari/${userId}`;
                const items = await axios.get(endpoint)
                const result = items.data.data
                // console.log(result);
                setCart(result);
            } catch (e) {
                console.log(e);
            }
        }
        getDataCart()
    }, [])

    const totalBarang = cart?.reduce((value, produk) => {
        return value + produk.kuantiti 
    }, 0)
    console.log(totalBarang);

    const totalBelanja = cart?.reduce((value, produk) => {
        return value + produk.harga_total
    }, 0)
    console.log(totalBelanja);

    useAuthenticatedPage()

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
                                <input type="checkbox" checked={isChecked} onChange={handleOnChange}/><span className="ml-2 ">Pilih Semua</span>
                                <button className={styles["delete-cart"]}>Hapus</button>
                            </div>
                            {cart?.map((value, key) => 
                                <div key={key} className="card-body d-flex align-items-center">
                                    <div className="row">
                                        <div className="col-1 pt-5">
                                            <input type="checkbox" id="produk" name="produk" checked={isChecked} onChange={handleOnChange}/>
                                        </div>
                                        <div className="col-3">
                                            <Image src={`${appConfig.apiUrl}/file/${value?.produk?.gambar}`} width={130} height={130} alt={'almari'} className="ml-2"style={{ marginTop: 10, marginBottom: 10, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', borderRadius: '4px' }}/>
                                        </div>
                                        <div className="col-4">
                                            <div className="ml-5">
                                                <h4>{value.produk.nama_produk}</h4>
                                                <span>Rp {value.harga_total}</span><br/>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className={styles["quantity-button-cart"]} style={{ marginLeft: -6 }}>
                                                <button className={styles["decrement-count-cart"]} onClick={decrementCount}>-</button>
                                                <span className={styles["count-result-cart"]}>{count}</span>
                                                <button className={styles["increment-count-cart"]} onClick={incrementCount}>+</button>
                                            </div>
                                        </div>
                                        <hr style={{ width: 580 }}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-5" style={{ marginTop: 120 }}>
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <label>Total Belanja</label><label className="ml-5">{totalBelanja}</label><br/>
                                    <label>Total Pesanan</label><label className="ml-5">{totalBarang}</label>
                                    <Link href="/customer/transaksi/order">
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