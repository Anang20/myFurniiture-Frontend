import Image from "next/image";
import imageRegister from '../public/images/register.png'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Register() {
    return (
        <>
        <div className="container">
            <div className={styles.container}>
                <div className="row justify-content-center mt-5">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-5 d-none d-lg-block p-5">
                                        <Image src={imageRegister} style={{ marginLeft: 35 }} width={500} height={450}/>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2" style={{ fontWeight: 'bold', fontSize: 36 }}>Daftar</h1>
                                            </div>
                                            <form action="" method="POST">
                                                <div className="form-group mt-4">
                                                    <input type="text" style={{ borderRadius: 15 }} name="nama_lengkap" className="form-control form-control-email" placeholder="Masukkan Nama Lengkap..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="email" style={{ borderRadius: 15 }} name="email" className="form-control" placeholder="Masukkan Email..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="number" style={{ borderRadius: 15 }} name="no_tlp" className="form-control" placeholder="Masukkan Nomor Telephone..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="password" style={{ borderRadius: 15 }} name="password" className="form-control" placeholder="Masukkan Password..." required/>
                                                </div>
                                                <div className="d-grid gap-2">
                                                    <button type="submit" style={{ borderRadius: 15, backgroundColor: '#00B8B0', border: 'none' }} className="btn btn-success btn-user btn-block mt-4">Daftar</button>
                                                    <center>
                                                        <p>Sudah Punya Akun?
                                                            <Link href="./login">
                                                                <a style={{ color: '#00B8B0' }}> Masuk</a>
                                                            </Link>
                                                        </p>
                                                    </center>
                                                </div>
                                            </form>
                                        </div>
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