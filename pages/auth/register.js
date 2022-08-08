import Image from "next/image";
import imageRegister from '../../public/images/register.png'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"
import axios from "axios";
import Head from "next/head";

const Register = () => {

    const [nama_lengkap, setNamaLengkap] = useState([])
    const [email, setEmail] = useState([])
    const [no_telp, setNotlp] = useState([])
    const [password, setPassword] = useState([])
    const [roleId, setRoleid] = useState(2)

    const onChangeNamaLengkap = (e) => {
        const value = e.target.value
        setNamaLengkap(value)
    }

    const onChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const onChangeNoTelephon = (e) => {
        const value = e.target.value
        setNotlp(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const onChangeRoleid = (e) => {
        const value = e.target.value
        setRoleid(value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()

    const registerSubmit = async () => {

        try {
            setNamaLengkap(nama_lengkap)
            setEmail(email)
            setNotlp(no_telp)
            setPassword(password)
            const res = await axios.post("http://localhost:3222/auth/register", {nama_lengkap, email, no_telp, password})
            .then(result => {
                if (result.data.statusCode == 201 || result.data.statusCode == 200) {
                    window.alert(result.data.message)
                    router.push('/auth/login')
                } else {
                    window.alert("Gagal mendaftar")
                }
            })
        } catch (error) {
            console.error(error); 
        }

    }

    return (
        <>
        <Head>
            <title>MyFuniture | Register</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="container">
            <div className={styles.container}>
                <div className="row justify-content-center mt-3">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-5 d-none d-lg-block p-5">
                                        <Image src={imageRegister} style={{ marginLeft: 35 }} width={650} height={700} alt={"register"}/>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2" style={{ fontWeight: 'bold', fontSize: 36 }}>Daftar</h1>
                                            </div>
                                            <form onSubmit={onSubmit} method="POST">
                                                <div className="form-group mt-4">
                                                    <input type="text" style={{ borderRadius: 15 }} className="form-control" value={nama_lengkap} onChange={onChangeNamaLengkap} placeholder="Masukkan Nama Lengkap..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="email" style={{ borderRadius: 15 }} className="form-control" value={email} onChange={onChangeEmail} placeholder="Masukkan Email..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="number" style={{ borderRadius: 15 }} className="form-control" value={no_telp} onChange={onChangeNoTelephon} placeholder="Masukkan Nomor Telephone..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="password" style={{ borderRadius: 15 }} className="form-control" value={password} onChange={onChangePassword} placeholder="Masukkan Password..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="hidden" style={{ borderRadius: 15 }} className="form-control" value={roleId} onChange={onChangeRoleid} required/>
                                                </div>
                                                <div className="d-grid gap-2">
                                                    <button type="submit" style={{ borderRadius: 15, backgroundColor: '#00B8B0', border: 'none' }} className="btn btn-success btn-user btn-block mt-4" onClick={registerSubmit}>Daftar</button>
                                                    <center>
                                                        <p>Sudah Punya Akun?
                                                            <Link href="./login">
                                                                <a style={{ color: '#00B8B0', textDecoration: 'none' }}> Masuk</a>
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
export default Register;