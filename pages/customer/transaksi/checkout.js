import NavbarCustomer from "../../components/navbar_customer";
import styles from "../../../styles/Home.module.css";
import Footer from "../../components/footer";
import Head from "next/head";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

const CheckOut = () => {

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
                                            <label>Rp 1000000</label>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="nama_bank" className="col-sm-2 col-form-label">Nama Bank:</label>
                                        <div className="col-sm-9">
                                            <select name="bank" className="form-select" aria-label="Default select example">
                                                <option defaultValue={'Pilih Bank'}>-- Pilih Bank --</option>
                                                <option value={1}>BCA</option>
                                                <option value={2}>BRI</option>
                                                <option value={3}>BNI</option>
                                                <option value={4}>MANDIRI</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="no_rek" className="col-sm-2 col-form-label">No. Rek:</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="no_rek" placeholder="Masukkan No Rekening" required/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="bukti_transfer" className="col-sm-2 col-form-label">Upload Bukti Transfer:</label>
                                        <div className="col-sm-9">
                                            <input type="file" className="form-control" name="bukti_transfer" required/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-9">
                                            <button className={styles["button-bayar"]}>Bayar</button>
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