import NavbarCustomer from "../../components/navbar_customer";
import { useEffect, useState } from "react";
import styles from "/styles/Home.module.css";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHolding } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import appConfig from "../../../config/app";
import axios from "axios";
import 'antd/dist/antd.css';
import { Image } from 'antd';
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

const DetailProduk = () => {

    const router = useRouter()
    const {produkId} = router.query
    const [userId, setUserId] = useState('');
    const [count, setCount] = useState(0)
    const [produk, setProduk] = useState([{
        nama_produk: '',
        gambar: '',
        harga: '0',
        deskripsi: '',
        stok: '',

    }])
    const stok = produk?.stok

    const decrementCount = () => {
        if (count > 0 ) {
            setCount(prevCount => prevCount - 1)
        }
    }

    const incrementCount = () => {
        if (count < stok ) {
        setCount(prevCount => prevCount + 1)
        }
    }
    
    const onChangeStok = (e) => {
        const value = e.target.value
        setCount(value)
    }

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
    
    useEffect(() => {
        const getData = async () => {
            const ress = await axios.get(`${appConfig.apiUrl}/produk/${produkId}`)
            const result = ress.data.data
            setProduk(result)
        };
        getData();
        
    }, [produkId])

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decode = jwtDecode(token);
                const id_user = decode.query["id_user"];
                setUserId(id_user)
            } catch (e) {
                console.log(e)
            }
        }
        getUser()
    }, [])
    
    const createDetail = async ()=> {
        try{
            const response = await axios.post(`${appConfig.apiUrl}/cart/${produkId}/${userId}`, {kuantiti: count})
            console.log(response);
            if (response.data.statusCode == 201) {
                Swal.fire("Berhasil", "Berhasil Menambahkan Produk Ke Keranjang", "success")
                router.push("/customer/produk/cart")
            } else {
                Swal.fire("gagal", "Upss Gagal Menambahkan Produk Ke Keranjang", "error")
            }
        }catch(e){
            console.log(e);
        }
    }
    useAuthenticatedPage();

    return (
        <>
        <Head>
            <title>MyFuniture | Detail Produk</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavbarCustomer/>
        <div className="container" style={{ position: 'relative', marginTop: 120, minHeight: '100%' }}>
            <div className="row">
                <div className="col-6">
                    <Image src={`${appConfig.apiUrl}/file/${produk?.gambar}`} width={400} height={380} alt={'Image Not Found '}/>
                </div>
                <div className="col-6">
                    <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <label style={{ position: 'absolute', fontStyle: 'normal', fontWeight: 600, fontSize: 30, top: 80 }}>{produk?.nama_produk}</label>
                        <label style={{ position: 'absolute', fontStyle: 'normal', fontWeight: 500, fontSize: 30, top: 180 }}>Rp {curency(produk?.harga)}</label>
                        <input type="hidden" value={count} onChange={onChangeStok} />
                        <Link href="/customer/produk/cart">
                            <button type="button" disabled={stok == 0 || count == 0} onClick={createDetail} className={styles["button-tambah-keranjang"]}>Tambah Ke Keranjang</button>
                        </Link>
                    </form>
                    <div className={styles["quantity-button"]}>
                        <button className={styles["decrement-count"]} onClick={decrementCount}>-</button>
                        <span className={styles["count-result"]}>{count}</span>
                        <button className={styles["increment-count"]} onClick={incrementCount}>+</button>
                    </div>
                </div>
                <h5 className="mt-2">Stok: {produk?.stok}</h5>
                <h5 className={styles["deskripsi-title"]}>Self Pickup</h5>
                <div className="col-7 d-flex">
                    <div className="col-2">
                        <FontAwesomeIcon
                        icon={faHandHolding}
                        style={{ width: 64, height: 40, marginLeft: -20 }}
                        />
                    </div>
                    <div className="col-5" style={{ marginLeft: -40 }}>
                        <small className={styles.deskripsi}>Anda dapat mengambil barang pada lokasi kami</small>
                    </div>
                </div>
                <h5 className={styles["deskripsi-title"]}>Detail Produk & Spesifikasi</h5>
                <div className="col-12">
                    <p className={styles.deskripsi}>
                    {produk?.deskripsi}
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
        </>        
    );
}
export default DetailProduk;