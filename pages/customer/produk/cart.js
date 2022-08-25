import Footer from "../../components/footer"
import NavbarCustomer from "../../components/navbar_customer"
import styles from "/styles/Home.module.css";
import Image from "next/image";
import almari from "/public/images/almari.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { message } from "antd";
import appConfig from "../../../config/app";
import axios from "axios";
import jwtDecode from "jwt-decode";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import { useRouter } from "next/router";

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
    const router = useRouter();
    // const [isChecked, setIsChecked] = useState(
    //     new Array()
    // );

    // const handleOnChange = () => {
    //     setIsChecked(!isChecked);
    // };
    
    // useEffect(() => {
    //     const updateData = async () => {
    //         try {
    //             const token = localStorage.getItem('accessToken')
    //             const decode = jwtDecode(token)
    //             const userId = decode.query["id_user"]
    //             const endpoint = `${appConfig.apiUrl}/cart/cari/${userId}`;
    //             const items = await axios.get(endpoint)
    //             const result = items.data.data
    //             // console.log(result);
    //             setCart(result);
    //         } catch (e) {

    //         }
    //         const response = await axios.get(`${appConfig.apiUrl}/`)
    //     }
    //     getDataCart()
    // }, [])

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

    const totalBelanja = cart?.reduce((value, produk) => {
        return value + produk.harga_total
    }, 0)

    const curency = (value)=>{
        const formatter = new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(value)
          .replace(/[IDR]/gi, '')
          .replace(/(\.+\d{2})/, '')
          .trimLeft()
          return formatter
    }

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
                        <div className="card" style={{ marginTop: 120, borderRadius: 0, marginBottom: 30}}>
                            <div className="card-body d-flex align-items-center justify flex-row" style={{ borderBottom: '3px solid rgba(0, 0, 0, 0.09)' }}>
                            </div>
                            {cart?.map((value, key) => 
                                <div key={key} className="card-body d-flex align-items-center">
                                    <div className="row">
                                        <div className="col-3">
                                            <Image src={`${appConfig.apiUrl}/file/${value?.produk?.gambar}`} width={130} height={130} alt={'almari'} className="ml-2"style={{ marginTop: 10, marginBottom: 10, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', borderRadius: '4px' }}/>
                                        </div>
                                        <div className="col-5">
                                            <div className="">
                                                <h4>{value.produk.nama_produk}</h4>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Harga Satuan : </td>
                                                            <td> Rp. {curency(value.produk.harga)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Kuantiti :</td>
                                                            <td>{value.kuantiti}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total Harga :</td>
                                                            <td> Rp. {curency(value.harga_total)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <button className={styles["delete-cart"]} onClick={
                                                async () => {
                                                    const apiDelete = `${appConfig.apiUrl}/cart/${value.id_cart_detail}`
                                                    const response = await axios.delete(apiDelete)
                                                    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
                                                        message.success("Produk Berhasil dihapus dari keranjang");
                                                        router.reload('/customer/produk/cart')
                                                    } else {
                                                        message.error("Upss Ada Kesalahan")
                                                    }
                                                }
                                            }>Hapus</button>
                                        </div>
                                        {/* <div className="col-2">
                                            <div className={styles["quantity-button-cart"]} style={{ marginLeft: -6 }}>
                                                <button className={styles["decrement-count-cart"]} onClick={decrementCount}>-</button>
                                                <span className={styles["count-result-cart"]} >{value.kuantiti}</span>
                                                <button className={styles["increment-count-cart"]} onClick={incrementCount}>+</button>
                                            </div>
                                        </div> */}
                                        <hr style={{ width: 580 }}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-5" style={{ marginTop: 120 }}>
                        <div className="card">
                            <div className="card-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontSize: 15 }}>Total Belanja : </td>
                                            <td style={{ fontSize: 15 }}>Rp. {curency(totalBelanja)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontSize: 15 }}>Total Produk : </td>
                                            <td style={{ fontSize: 15 }}>{totalBarang}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                    <Link href="/customer/transaksi/order">
                                    <button className={styles["button-lanjut-pembayaran"]}>Lanjutkan Ke Pembayaran</button>
                                    </Link>
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