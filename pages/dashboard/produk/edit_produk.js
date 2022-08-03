import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";

const EditProduk = () => {
    return (
        <>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid">
                    <h4 className="text-gray-600">Edit Produk</h4>
                    <div className="card shadow">
                        <div className="card-body">

                            <form method="POST">
                                <div className="row mb-3">
                                    <div className="col-sm-9">
                                        <input type="hidden" className="form-control" name="id_produk" required readOnly/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="nama_produk" className="col-sm-2 col-form-label">Nama Produk</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="nama_produk" placeholder="Masukkan Nama Produk" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="gambar" className="col-sm-2 col-form-label">Gambar</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="gambar" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="harga" className="col-sm-2 col-form-label">Harga</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="harga" placeholder="Masukkan Harga" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="deskripsi" className="col-sm-2 col-form-label">Deskripsi</label>
                                    <div className="col-sm-9">
                                    <textarea name="deskripsi" className="form-control" cols={30} rows={5} required></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="stok" className="col-sm-2 col-form-label">Stok</label>
                                    <div className="col-sm-9">
                                        <input type="stok" className="form-control" name="stok" required/>
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
export default EditProduk;