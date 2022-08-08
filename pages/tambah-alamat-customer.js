import Head from "next/head";
import Footer from "./components/footer";
import NavbarCustomer from "./components/navbar_customer";
import SideBarCustomer from "./components/sidebar-customer";
import Link from "next/link";

const TambahAlamatCustomer = () => {
    return(
        <>
        <Head>
            <title>MyFuniture | Tambah Alamat</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavbarCustomer/>
        <div className="container" style={{ marginTop: 120 }}>
                <div className="row">
                    <SideBarCustomer/>
                    <div className="col-10">
                        <div className="card" style={{ minHeight: 500 }}>
                            <div className="card-body">
                                <form method="POST">
                                    <div className="row mb-3">
                                        <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Provinsi</label>
                                        <div className="col-sm-9">
                                            <select name="provinsi" className="form-select" aria-label="Default select example">
                                                <option defaultValue={'Pilih Provinsi'}>-- Pilih Provinsi --</option>
                                                <option value={1}>Jawa Barat</option>
                                                <option value={2}>Jawa Tengah</option>
                                                <option value={3}>Jawa Timur</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Kota</label>
                                        <div className="col-sm-9">
                                            <select name="kota" className="form-select" aria-label="Default select example">
                                                <option defaultValue={'Pilih Kota'}>-- Pilih Kota --</option>
                                                <option value={1}>Jepara</option>
                                                <option value={2}>Pati</option>
                                                <option value={3}>Kudus</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Kecamatan</label>
                                        <div className="col-sm-9">
                                            <select name="kecamatan" className="form-select" aria-label="Default select example">
                                                <option defaultValue={'Pilih Kecamatan'}>-- Pilih Kecamatan --</option>
                                                <option value={1}>Kembang</option>
                                                <option value={2}>Bangsri</option>
                                                <option value={3}>Mlonggo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Kelurahan</label>
                                        <div className="col-sm-9">
                                            <select name="kelurahan" className="form-select" aria-label="Default select example">
                                                <option defaultValue={'Provinsi'}>-- Piih Kelurahan --</option>
                                                <option value={1}>Kancilan</option>
                                                <option value={2}>Tubanan</option>
                                                <option value={3}>Kaliaman</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="foto" className="col-sm-2 col-form-label">Detail Nama Jalan RT/RW</label>
                                        <div className="col-sm-9">
                                            <textarea name="alamat" className="form-control" cols={30} rows={5} required></textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-sm-2 col-form-label">Latitude</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" placeholder="Masukkan Latitude dari google maps" required/>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-sm-2 col-form-label">Longtitude </label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" placeholder="Masukkan Lontiude dari google maps" required/>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-5">
                                            <Link href="/alamat-customer">
                                                <a className="btn btn-warning mr-3">Cancel</a>
                                            </Link>
                                            <button type="submit" className="btn btn-success">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        <Footer/>
        </>
    )
}
export default TambahAlamatCustomer;