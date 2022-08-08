import NavbarCustomer from "./components/navbar_customer";
import SideBarCustomer from "./components/sidebar-customer";
import Footer from "./components/footer";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const data = [
    {
        key: 1,
        nama_lengkap: "anang syah",
        Telp: '08948568598',
        alamat: "Asa Creative, Jalan Raya Kalimalang No.40, Jatibening, Pondok Gede PONDOK GEDE, KOTA BEKASI, JAWA BARAT"
    },
    {
        key: 2,
        nama_lengkap: "anang syah",
        Telp: '08948568598',
        alamat: "Asa Creative, Jalan Raya Kalimalang No.40, Jatibening, Pondok Gede PONDOK GEDE, KOTA BEKASI, JAWA BARAT"
    },
]

const ListAlamat = () => {
    return (
        <>
        <div className="col-10">
            <div className="card" style={{ minHeight: 500 }}>
                <div className="card-body">
                    <div className="row mb-3">
                        <div>
                            <h5 style={{ display: 'block', float: 'left' }}>Alamat Saya</h5>
                            <Link href="/tambah-alamat-customer">
                            <button style={{ width: 214, height: 43, backgroundColor: '#00B8B0', color: 'white', display: 'block', float: 'right', border: 'none' }}><FontAwesomeIcon icon={faPlus} style={{ paddingRight: 5 }}/>Tambahkan Alamat Baru</button>
                            </Link>
                        </div>
                        <div className="col-sm-12">
                            <hr/>
                        </div>
                    </div>
                    {data?.map((value) => 
                    <div className="row mb-3">
                        <div className="col-4">
                            <p>Nama Lengkap</p>
                            <p>Telephone</p>
                            <p>Alamat</p>
                        </div>
                        <div className="col-4">
                            <p>{value.nama_lengkap}</p>
                            <p>{value.Telp}</p>
                            <p>{value.alamat}</p>
                        </div>
                        <div className="col-4">
                            <button style={{ border: 'none', background: 'transparent', listStyle: 'unset' }}><a>Hapus</a></button>
                        </div>
                        <div className="col-sm-12">
                            <hr/>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div> 
        </>
    )
}

const AlamatCustomer = () => {
    return (
        <>
        <Head>
            <title>MyFuniture | Alamat</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavbarCustomer/>
            <div className="container" style={{ marginTop: 120 }}>
                <div className="row">
                    <SideBarCustomer/>
                    <ListAlamat/>
                </div>
            </div>
        <Footer/>
        </>
    )
}
export default AlamatCustomer;