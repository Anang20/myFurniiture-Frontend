import NavbarCustomer from "../../components/navbar_customer";
import styles from "../../../styles/Home.module.css";
import Footer from "../../components/footer";
import Head from "next/head";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import jwtDecode from "jwt-decode";
import appConfig from "../../../config/app";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const CheckOut = () => {

    const [dataOrder, setDataOrder] = useState('');
    const [lastIdOrder, setLastIdOrder] = useState('');
    const [totalOrder, setTotalOrder] = useState(0);
    const [namaBank, setNamaBank] = useState('');
    const [noRekening, setNoRekening] = useState('');
    const [buktiTransfer, setBuktiTransfer] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getDataOrder = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decode = jwtDecode(token);
                const id = decode.query["id_user"];
                const endpoint = `${appConfig.apiUrl}/order/${id}`
                
                await axios.get(endpoint).then((value) => {
                    const dataUserOrder = value.data;
                    setDataOrder(dataUserOrder);
                })
            } catch(e) {
                console.log(e)
            }
        }
        getDataOrder()
    }, [])
    
    useEffect(() => {
        const getLastOrder = () => {
            const getData = dataOrder.length - 1;
            const getLastOrder = dataOrder[getData];
            const lastOrderId = getLastOrder?.id_order;
            const totalOrder = getLastOrder?.total_order;
            setLastIdOrder(lastOrderId)
            setTotalOrder(totalOrder)    
        }
        getLastOrder()
    })

    const onChangeOrderId = (event) => {
        const value = event.target.value;
        setLastIdOrder(value);
    }

    const onChangeNamaBank = (event) => {
        const value = event.target.value;
        setNamaBank(value);
    }

    const onChangeNoRekening = (event) => {
        const value = event.target.value;
        setNoRekening(value);
    }

    const onChangeBuktiTransfer = async (event) => {
        const value = event.target.files[0];
        const data = {
            file : value
        }
        try {
            const res = await axios.post(`${appConfig.apiUrl}/file/upload`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setBuktiTransfer(res.data.data.filename)
        } catch(err) {

        }
    }

    const checkoutSubmit = async () => {
        try {
            const response = await axios.post(`${appConfig.apiUrl}/payment`, {nama_bank: namaBank, no_rek: noRekening, gambar: buktiTransfer, id_order: lastIdOrder})
           
                if (response.status == 201) {
                    router.push("/customer/riwayat")
                    Swal.fire("Order Berhasil", "Tunggu Admin Menkonfirmasi Pembayaran Anda", "success")
                } else {
                    Swal.fire("Pembayaran Anda Gagal", "Pembayaran Gagal", "error")
                }
        
        } catch (err) {
            console.log('error nya adalah', err);
        }
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

    useAuthenticatedPage()
    
    return (
        <>
        <Head>
            <title>MyFuniture | Checkout</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavbarCustomer/>
        <div className="container-fluid" style={{ backgroundColor: '#ECEEEE' }}>
            <div className="container" style={{ backgroundColor: '#ECEEEE' }}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card" style={{ marginTop: 120, borderRadius: 0}}>
                            <div className="card-body">
                                <h4 style={{ textAlign: 'center' }}>Checkout</h4>
                                <form method="POST">

                                    <div className="row mb-3 d-flex">
                                        <label className="col-sm-2 col-form-label">Total Harga:</label>
                                        <div className="col-sm-9 mt-1">
                                            <label>Rp {curency(totalOrder)}</label>
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <label htmlFor="nama_bank" className="col-sm-2 col-form-label">Nama Bank:</label>
                                        <div className="col-sm-9">
                                            <select name="bank" className="form-select" value={namaBank} onChange={onChangeNamaBank} aria-label="Default select example">
                                                <option defaultValue={'Pilih Bank'}>-- Pilih Bank --</option>
                                                <option value={'BCA'}>BCA</option>
                                                <option value={'BRI'}>BRI</option>
                                                <option value={'BNI'}>BNI</option>
                                                <option value={'MANDIRI'}>MANDIRI</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="no_rek" className="col-sm-2 col-form-label">No. Rek:</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="no_rek" value={noRekening} onChange={onChangeNoRekening} placeholder="Masukkan No Rekening" required/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="bukti_transfer" className="col-sm-2 col-form-label">Upload Bukti Transfer:</label>
                                        <div className="col-sm-9">
                                            <input type="file" className="form-control" onChange={onChangeBuktiTransfer} name="bukti_transfer" required/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-9">
                                            <input type="hidden" className="form-control" value={lastIdOrder} onChange={onChangeOrderId} name="no_rek" placeholder="Masukkan No Rekening" required/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-9">
                                            <button className={styles["button-bayar"]} type="button" onClick={checkoutSubmit }>Bayar</button>
                                        </div>
                                    </div>
                            
                                </form>
                            </div>
                         </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="card" style={{ marginTop: 120, borderRadius: 0}}>
                            <div className="card-body">
                                <h5 className="text-center">Cara Pembayaran</h5>
                                <p className={styles["langkah-bayar"]}>1. pastikan Anda telah melengkapi <span className="text-danger">profil alamat</span> yang ada di user profile, jika belum, masuk ke user profile lalu pilih menu alamat</p>
                                <p className={styles["langkah-bayar"]}>2. Pergi ke ATM terdekat dan lakukan transfer ke nomor rekening berikut <span className="text-danger">113-00-1522-616-4</span></p>
                                <p className={styles["langkah-bayar"]}>3. Setelah transfer <span className="text-danger">harap simpan bukti transfer</span></p>
                                <p className={styles["langkah-bayar"]}>4. Lalu masukkan nama bank yang anda pilih, no rekening anda dan <span className="text-danger">upload bukti transfer yang anda simpan tadi</span></p>
                                <p className={styles["langkah-bayar"]}>5. Klik Bayar dan barang yang anda beli akan di proses untuk dikirim/dibuat</p>
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
export default CheckOut;