import Image from "next/image";
import imageLogin from '../../public/images/login.png'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import { useState, Fragment } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { useAuthenticatedPage } from "../../helper/Authenticated";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const onChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()
    const loginSubmit = async () => {

    try {
        const formData = {
            email: email,
            password: password
        }

        console.log(formData)
        axios.post("http://localhost:3222/auth/login", formData, {
            headers: { 'content-type': 'application/json' }
        }).then(result => {

            const decode = jwtDecode(result.data.accessToken)
            const role = decode.query.role["role_name"];
            const id = decode.query["id_user"];
            window.alert(result.data.message)
            if (role === "admin") {
                window.alert("berhasil")
                localStorage.setItem('accesToken', result.data.accessToken)
                router.push(`../dashboard/${id}`); 
            } else if (role === "customer") {
                localStorage.setItem('accessToken', result.data.accessToken)
                router.push(`../home`);
            }
        })
    } catch (error) {
        console.error(error);
    } 
}

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
                                        <Image src={imageLogin} style={{ marginLeft: 35 }} width={500} height={450} alt={"login"}/>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2" style={{ fontWeight: 'bold', fontSize: 36 }}>Masuk</h1>
                                            </div>
                                            <form onSubmit={onFormSubmit} method="POST">
                                                <div className="form-group mt-4">
                                                    <input type="email" style={{ borderRadius: 15 }} name="email" className="form-control form-control-email" value={email} onChange={onChangeEmail} placeholder="Masukkan Email..." required/>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <input type="password" style={{ borderRadius: 15 }} name="password" className="form-control form-control-password" value={password} onChange={onChangePassword} placeholder="Masukkan Password..." required/>
                                                </div>
                                                <div className="d-grid gap-2">
                                                    <button type="submit" style={{ borderRadius: 15, backgroundColor: '#00B8B0', border: 'none' }} onClick={loginSubmit} className="btn btn-success btn-user btn-block mt-4">Masuk</button>
                                                    <center>
                                                        <p>Belum Punya Akun?
                                                            <Link href="./register">
                                                                <a style={{ color: '#00B8B0', textDecoration: 'none' }}> Daftar</a>
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
export default Login;