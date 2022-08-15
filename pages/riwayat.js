import Image from "next/image";
import NavbarCustomer from "./components/navbar_customer";
import almari from "../public/images/almari.png";
import Footer from "./components/footer";

const Riwayat = () => {
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
                    <div className="card" style={{ marginTop: 20, boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
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
                    </div>
                    <div className="card" style={{ marginTop: 20, boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
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
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Riwayat;