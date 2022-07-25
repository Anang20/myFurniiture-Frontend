import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";

const EditProfileAdmin = () => {
    return (
        <>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid">
                    <h4 className="text-gray-600">Edit Profile</h4>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-sm-9">
                                    <input type="hidden" className="form-control" name="id_user" required readOnly/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Nama Lengkap</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="nama_lengkap" placeholder="Ubah Nama" required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control" name="email" placeholder="Ubah Email" required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="no_telp" className="col-sm-2 col-form-label">No. Telephone</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" name="no_telp" placeholder="Ubah Nomor Telephone" required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="foto" className="col-sm-2 col-form-label">Foto</label>
                                <div className="col-sm-9">
                                    <input type="file" className="form-control" name="foto" required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" name="password" required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-5">
                                    <a href="#" className="btn btn-warning mr-3">Cancel</a>
                                    <button type="submit" className="btn btn-success">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default EditProfileAdmin;