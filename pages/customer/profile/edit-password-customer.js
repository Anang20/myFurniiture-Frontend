import { message } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import appConfig from "../../../config/app";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import Footer from "../../components/footer";
import NavbarCustomer from "../../components/navbar_customer";
import SideBarCustomer from "../../components/sidebar-customer";
import Swal from "sweetalert2";

const FormEditPasswordCustomer = () => {

    const [userId, setUserId] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const getDataUser = () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decode = jwtDecode(token);
                const id = decode.query["id_user"];
                setUserId(id)
            } catch(e) {
                console.log(e);
            }
        }
        getDataUser()
    }, [])

    const onChangeEditPassword = async (e) => {
        const value = await e.target.value;
        setEditPassword(value)
    }

    useEffect(() => {
        if (isCPasswordDirty) {
            if (editPassword === cPassword) {
                setShowErrorMessage(false);
                setCPasswordClass('form-control is-valid')
            } else {
                setShowErrorMessage(true)
                setCPasswordClass('form-control is-invalid')
            }
        }
    }, [cPassword])

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setIsCPasswordDirty(true);
    }


    const EditPasswordSubmit = async () => {
        try {
            const response = await axios.put(`${appConfig.apiUrl}/users/update/password/${userId}`, {password: cPassword}, {
            })      
            if (response.status == 200) {
                Swal.fire("Berhasil", "Password Berhasil Di Ubah", "success")
                router.push("/customer/profile/edit-profile-customer")
            } else {
                Swal.fire("Gagal", "Upss Gagal Mengedit Password", "error")
            }
        
        } catch (err) {
            console.log('error nya adalah', err);
        }
    }

    useAuthenticatedPage()
    return (
        <>
        <div className="col-10">
            <div className="card shadow" style={{ minHeight: 500 }}>
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-9">
                                <input type="password" value={editPassword} className="form-control" onChange={onChangeEditPassword} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Konfirmasi Password</label>
                            <div className="col-sm-9">
                                <input type="password" className={cPasswordClass} value={cPassword} onChange={handleCPassword} required/>
                            </div>
                            {showErrorMessage && isCPasswordDirty ? <span className="text-danger"> Password Tidak Sama </span> : ''}
                        </div>
                        <button type="button" onClick={EditPasswordSubmit} className="btn btn-success" style={{ marginLeft: 148 }}>Ubah</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

const EditPasswordCustomer = () => {
    return (
        <>
            <Head>
                <title>MyFuniture | Edit Password</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavbarCustomer/>
            <div className="container" style={{ marginTop: 120 }}>
                <div className="row">
                    <SideBarCustomer/>
                    <FormEditPasswordCustomer/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default EditPasswordCustomer;