import Image from "next/image";
import NavbarCustomer from "../components/navbar_customer";
import almari from "../../public/images/almari.png";
import Footer from "../components/footer";
import useAuthenticatedPage from "../../helper/useAuthenticatedPage";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import appConfig from "../../config/app";
import axios from "axios";

const Riwayat = () => {

    const [history, setHistory] = useState([]);
    const [nama, setNama] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [data, setData] = useState([{
        alamat: '',
        nomerorder: 0,
        status: '',
        totalOrder: 0,
        kuantiti: 0,
        harga_total: 0,
        nama_produk: '',
        gambar: '',
        harga: 0,
    }]);

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
        const getHistory = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decode = jwtDecode(token);
                const id = decode.query["id_user"];
                const nama = decode.query["nama_lengkap"];
                const no_telp = decode.query["no_telp"];
                setNama(nama);
                setNoTelp(no_telp);
                const endpoint = `${appConfig.apiUrl}/history/${id}`
                
                await axios.get(endpoint).then((value) => {
                    const dataUserHistory = value.data.data
                    console.log(dataUserHistory);
                    setHistory(dataUserHistory);
                    // console.log(prop);
                })
            } catch (err) {
                console.log(err);
            }
        }
        getHistory() 
    }, [])

    useEffect(() => {
        // var result =[];
        const joinArray = async () => {
            try {
                const filterHistory = await history?.map(item => {
                    return item?.produk?.map(childItem => {
                        return {
                            alamat: item?.alamat,
                            nomerorder: item?.nomerorder,
                            status: item?.status,
                            totalOrder: item?.totalOrder,
                            kuantiti: childItem?.kuantiti,
                            harga_total: childItem?.harga_total,
                            nama_produk: childItem?.produk?.nama_produk,
                            gambar: childItem?.produk?.gambar,
                            harga: childItem?.produk?.harga,
                        }
                    })
                })
                const result = filterHistory[0]
                // console.log(result); 
                setData(result)
            } catch (e) {
                console.log(e);
            }
        }
        joinArray()
    })
    console.log(data);
        // let resultOfArrayMap = joinArray(filterHistory);
        // const properlyMappedArray = resultOfArrayMap.reduce((arrayBeingBuilt, currValue) => {
        //     return arrayBeingBuilt.concat(...currValue);
        // }, []);
        // console.log(properlyMappedArray);
    useAuthenticatedPage()

    return (
        <>
        <NavbarCustomer/>
        <div className="container" style={{ marginTop: 120 }}>
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                        <h2 className="text-center pt-3">History</h2>
                    </div>
                </div>

                <div className="col-12 mt-5">
                    {data?.map((value, index) => {
                        return (
                            <div className="card" key={index} style={{ marginTop: 20, boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                <div className="container">
                                    <span style={{ float: 'left', marginTop: 25 }}>Nomor Order: <span style={{ color: '#00B8B0' }}>{value.nomerorder}</span></span>
                                    <span style={{ float: 'right', marginTop: 25 }}>Status: <span style={{ color: '#00B8B0' }}>{value.status}</span></span>
                                </div>
                                <hr style={{ marginLeft: 29, marginRight: 29 }}/>
                                {/* {history[0].produk.map(produk => { */}
                                    <div className="row">
                                        <div className="col-2" style={{ marginLeft: 29 }}>
                                            <Image src={`${appConfig.apiUrl}/file/${value.gambar}`} width={117} height={110} alt={"image not found"} style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", borderRadius: 4 }}/>
                                        </div>
                                        <div className="col-3">
                                            <h5>{value.nama_produk}</h5>
                                            <p>Rp {curency(value.harga)}</p>
                                            <p>x{value.kuantiti}</p>
                                            <p>Jumlah Harga Rp {curency(value.harga_total)}</p>
                                        </div>
                                        <div className="container">
                                            <span style={{ color: '#00B8B0', float: 'right', marginRight: 11 }}>Total Pesanan: <span style={{ color: '#818B8B' }}>Rp {curency(value.totalOrder)}</span></span>
                                        </div>
                                    </div>
                                {/* })} */}
                                <hr style={{ marginLeft: 29, marginRight: 29 }}/>
                                <div className="container">
                                    <h5>Alamat Pengiriman</h5>
                                    <p style={{ fontWeight: 500, fontSize: 16 }}>{nama}</p>
                                    <p style={{ fontWeight: 500, fontSize: 16, color: '#818B8B', marginBottom: 10 }}>{noTelp}</p>
                                    <p style={{ fontWeight: 500, fontSize: 16, color: '#818B8B', marginBottom: 10 }}>{value.alamat}</p>
                                </div>
                            </div>
                        )
                    })}
                    {/* <div className="card" style={{ marginTop: 20, boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                        <div className="container">
                            <span style={{ float: 'right', marginTop: 25 }}>Status: <span style={{ color: '#00B8B0' }}>Selesai</span></span>
                        </div>
                        <hr style={{ marginLeft: 29, marginRight: 29 }}/>
                        <div className="row">
                            <div className="col-2" style={{ marginLeft: 29 }}>
                                <Image src={almari} width={117} height={110} alt={"image not found"} style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", borderRadius: 4 }}/>
                            </div>
                            <div className="col-3">
                                <h5>Lemari Minimalis </h5>
                                <p>Rp 7000000</p>
                                <p>x3</p>
                            </div>
                            <div className="container">
                                <span style={{ color: '#00B8B0', float: 'right', marginRight: 11 }}>Total Pesanan: <span style={{ color: '#818B8B' }}>Rp 21000000</span></span>
                            </div>
                        </div>
                        <hr style={{ marginLeft: 29, marginRight: 29 }}/>
                        <div className="container">
                            <h5>Alamat Pengiriman</h5>
                            <p style={{ fontWeight: 500, fontSize: 16 }}>Anang Syah Amirul Haqim</p>
                            <p style={{ fontWeight: 500, fontSize: 16, color: '#818B8B', marginBottom: 10 }}>089670068639</p>
                            <p style={{ fontWeight: 500, fontSize: 16, color: '#818B8B', marginBottom: 10 }}>Jalan Sudirman Jakarta Pusat</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Riwayat;