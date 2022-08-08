import NavbarCustomer from "./components/navbar_customer"
import SideBarCustomer from "./components/sidebar-customer";
import Footer from "./components/footer";
import Head from "next/head";

const FormEditProfile = () => {
    return (
        <>
        <Head>
            <title>MyFuniture | Edit Profile</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="col-10">
            <div className="card" style={{ minHeight: 500 }}>
                <div className="card-body">
                    <form method="POST">
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Nama Lengkap</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" value={'customer'} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" value={'customer@gmail.com'} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="no_telp" className="col-sm-2 col-form-label">No Telephone</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" value={'089670068639'} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="foto" className="col-sm-2 col-form-label">Foto</label>
                            <div className="col-sm-9">
                                <input type="file" className="form-control" required/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success" style={{ marginLeft: 148 }}>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

const EditProfileCustomer = () => {
    return (
        <>
            <NavbarCustomer/>
            <div className="container" style={{ marginTop: 120 }}>
                <div className="row">
                    <SideBarCustomer/>
                    <FormEditProfile/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default EditProfileCustomer;