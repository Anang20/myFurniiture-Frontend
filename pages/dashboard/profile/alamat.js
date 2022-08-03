import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";

const AlamatAdmin = () => {
    return (
        <>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid">
                    <h4 className="text-gray-600">Alamat Admin</h4>
                    <div className="card shadow">
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
                                        <input type="text" className="form-control" name="latitude" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-sm-2 col-form-label">Longtitude </label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="longtitude" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-5">
                                        <a href="#" className="btn btn-warning mr-3">Cancel</a>
                                        <button type="submit" className="btn btn-success">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default AlamatAdmin;