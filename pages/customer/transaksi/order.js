import Image from "next/image";
import NavbarCustomer from "../../components/navbar_customer"
import almari from "/public/images/almari.png";
import Footer from "../../components/footer";
import Head from "next/head";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

const Order = () => {

    useAuthenticatedPage()
    return (
        <>
        <Head>
            <title>MyFuniture | Order</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
       <NavbarCustomer/>
       <div className="container" style={{ marginTop : 120 }}>
            <div className="card">
               <div className="card-body">
                    <h4 className="text-center">Produk Dipesan</h4>
                    <div className="alert alert-warning" role="alert" style={{ fontStyle: 'normal', fontWeight: 400, fontSize: 15, }}>
                        pastikan Anda telah melengkapi <b className="text-danger">profil alamat</b> yang ada di user profile, jika belum, masuk ke user profile lalu pilih menu alamat
                    </div>

                    <form method="POST">
                        <div className="row mb-3">
                            <label htmlFor="alamat" className="col-sm-2 col-form-label">Pilih Alamat:</label>
                            <div className="col-sm-10">
                                <select name="id_alamat_user" className="form-select" aria-label="Default select example">
                                    <option defaultValue={'Pilih Alamat'}>-- Pilih Alamat --</option>
                                    <option value={1}>Jepara</option>
                                    <option value={2}>Kendal</option>
                                    <option value={3}>Bekasi</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-9">
                                <input type="hidden" className="form-control" name="id_cart" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" className="form-control" name="id_harga_kirim" required/>
                            </div>
                
                            <div className="col-sm-9">
                                <input type="hidden" className="form-control" name="total_hrg_brg" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" className="form-control" name="total_hrg_kirim" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" className="form-control" name="total_order" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" className="form-control" name="status" required/>
                            </div>

                            <table style={{ textAlign: 'center', width: '100%', marginTop: 59 }}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Produk</th>
                                        <th>Harga Satuan</th>
                                        <th>Jumlah</th>
                                        <th>Subtotal Produk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Image src={almari} width={59} height={62} alt={almari} style={{ borderRadius: 4, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}/></td>
                                        <td>Almari Minimalis</td>
                                        <td>Rp 7000000</td>
                                        <td>1</td>
                                        <td>Rp 7000000</td>
                                    </tr>
                                    <tr>
                                        <td><Image src={almari} width={59} height={62} alt={almari} style={{ borderRadius: 4, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}/></td>
                                        <td>Almari Minimalis</td>
                                        <td>Rp 7000000</td>
                                        <td>1</td>
                                        <td>Rp 7000000</td>
                                    </tr>
                                    <tr>
                                        <td><Image src={almari} width={59} height={62} alt={almari} style={{ borderRadius: 4, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}/></td>
                                        <td>Almari Minimalis</td>
                                        <td>Rp 7000000</td>
                                        <td>1</td>
                                        <td>Rp 7000000</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <div style={{ paddingLeft: 730, marginTop: 59, marginRight: 75, }}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingRight: 27 }}>Total harga produk</td>
                                            <td>Rp 21000000</td>
                                        </tr>
                                        <tr>
                                            <td>Biaya Ongkir</td>
                                            <td>Rp 100000</td>
                                        </tr>
                                        <tr>
                                            <td>Total Pembayaran</td>
                                            <td>Rp 21100000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button style={{  marginLeft: 720, marginTop: 28, width: 296, height: 50, background: '#00B8B0', color: '#FFFFFF', fontWeight: 400, fonstSize: 20, borderRadius: 15, border: 'none' }}>Buat Pesanan</button>
                        </div>
                    </form>
                    
               </div>
            </div>
       </div>
       <Footer/>
       </>
    )
}
export default Order; 