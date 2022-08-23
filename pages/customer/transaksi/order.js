import Image from "next/image";
import NavbarCustomer from "../../components/navbar_customer"
import almari from "/public/images/almari.png";
import Footer from "../../components/footer";
import Head from "next/head";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import jwtDecode from "jwt-decode";
import appConfig from "../../../config/app";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Order = () => {
    const [produk, setProduk] = useState([{
        produk: {
            gambar: '',
            nama_produk:'',
            harga: 0,
        }
    }])
    const [alamat, setAlamat] = useState([{}])
    const [alamatId, setAlamatId] = useState('')
    const [ongkir, setOngkir] = useState(0)
    const [hargaProduk,setHargaProduk] = useState(0)
    const [cartId,setIdCart] = useState('')
    const [order,setOrder] = useState(0)
    
    const router = useRouter()

    useEffect(() => {
        const getProduk = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decode = jwtDecode(token)
                const id = decode.query["id_user"];
                // produk
                const res = await axios.get(`${appConfig.apiUrl}/order/cart/${id}`)
                // console.log(res,'res');
                const produk = res.data.data.detail
                // console.log(produk, 'ini produk');
                const cartId = res.data.data.id_cart
                setIdCart(cartId)
                // console.log(cartId, 'ini id card');
                const hasil = []    
                setProduk(produk)
                // Alamat
                const respon = await axios.get(`${appConfig.apiUrl}/users/cari_alamat/${id}`)
                const alamat = respon.data.data.alamat
                setAlamat(alamat)
                
            } catch (err) {
                console.log('errornya', err);
            }
        }
        getProduk()
    }, [])

    useEffect(() => {
        const getOngkir = async () => {
            try {
                const res = await axios.post(`${appConfig.apiUrl}/order/ongkir/${alamatId}`)
                // console.log(res, 'ini alamat');
                const ongkir = res.data.data
                // console.log(ongkir, 'ini ongkir');
                setOngkir(ongkir)
            } catch (err) {
                console.log('errornya', err);
            }
        }
        getOngkir()
    }, [alamatId])
    
    const createOrder = async () => {
        try {
            const response = await axios.post(`${appConfig.apiUrl}/order/buat/order`, {id_cart: cartId, id_alamat: alamatId, total_hrg_brg: hargaProduk, total_hrg_krm: ongkir, total_order: order})
            // console.log(response, 'ini response')
           
                if (response.status == 201 || response.status == 200) {
                    router.push("/customer/transaksi/checkout")
                    message.success("Berhasil Order")
                } else {
                    message.error("Upss ada kesalahan saat menambahkan order")
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

    const totalHargaProduk = async () => {
        const hasil = await produk.reduce((value, i)=> {
            return value + i.harga_total
        }, 0)
        // console.log(produk)
        // console.log(hasil);
        setHargaProduk(hasil)
    }
    totalHargaProduk()

    const totalOrder = async () => {
        const hasil = await ongkir + hargaProduk
        // console.log(hasil, 'hasil');
        setOrder(hasil)
    }
    totalOrder()

    const onChangeCartId = async (event) => {
        const getCartId = await event.target.value;
        setIdCart(getCartId);
    }

    const onChangeAlamat = async (event) => {
        const getAlamatId = await event.target.value;
        setAlamatId(getAlamatId);
    }

    const onChangeTotalHargaProduk = (event) => {
        const totalHargaProduk = event.target.value;
        setHargaProduk(totalHargaProduk);
    }

    const onChangeOngkir = (event) => {
        const hargaOngkir = event.target.value;
        setOngkir(hargaOngkir);
    }

    const onChangeTotalOrder = (event) => {
        const totalOrder = event.target.value;
        setOrder(totalOrder)
    }

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

                    <form>
                        <div className="row mb-3">
                            <label htmlFor="alamat" className="col-sm-2 col-form-label">Pilih Alamat:</label>
                            <div className="col-sm-10">
                                <select name="id_alamat_user" className="form-select" aria-label="Default select example" onChange={(e) => onChangeAlamat (e)}>
                                    <option defaultValue={'Pilih Alamat'}>-- Pilih Alamat --</option>
                                    {
                                        alamat?.map((value, index) => (
                                             <option key={index} value={value.id_alamat_user}>{value.alamat}</option>
                                    ))
                                }
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-9">
                                <input type="hidden" value={cartId} onChange={onChangeCartId} className="form-control" name="id_cart" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" value={alamatId} className="form-control" onChange={onChangeAlamat} name="id_alamat" required/>
                            </div>
                
                            <div className="col-sm-9">
                                <input type="hidden" value={hargaProduk} onChange={onChangeTotalHargaProduk} className="form-control" name="total_hrg_brg" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" value={ongkir} onChange={onChangeOngkir} className="form-control" name="total_hrg_kirim" required/>
                            </div>

                            <div className="col-sm-9">
                                <input type="hidden" value={order} onChange={onChangeTotalOrder} className="form-control" name="total_order" required/>
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
                                {
                                    produk?.map((value, key)=>{
                                     return (
                                     <tr key={key}>
                                            <td><Image src={`${appConfig.apiUrl}/file/${value?.produk?.gambar}`} width={59} height={62} alt={almari} style={{ borderRadius: 4, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}/></td>
                                            <td>{value.produk.nama_produk}</td>
                                            <td>Rp. {curency(value.produk.harga)}</td>
                                            <td>{value.kuantiti}</td>
                                            <td>Rp. {curency(value.harga_total)}</td>
                                        </tr> 
                                     )  
                                    })
                                    
                                }
                                    
                                </tbody>
                            </table>
                            
                            <div style={{ paddingLeft: 730, marginTop: 59, marginRight: 75, }}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingRight: 27 }}>Total harga produk</td>
                                            <td>Rp. {curency(hargaProduk||0)}</td>
                                        </tr>
                                        <tr>
                                            <td>Biaya Ongkir</td>
                                            <td>Rp. {curency(ongkir||0)}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Pembayaran</td>
                                            <td>Rp. {curency(hargaProduk+ ongkir||0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={createOrder} style={{  marginLeft: 720, marginTop: 28, width: 296, height: 50, background: '#00B8B0', color: '#FFFFFF', fontWeight: 400, fonstSize: 20, borderRadius: 15, border: 'none' }}>Buat Pesanan</button>
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