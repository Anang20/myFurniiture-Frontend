import { message } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import appConfig from "../../../config/app";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";

const EditPassword = () => {
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
            console.log(response)        
            if (response.status == 200) {
                message.success("Password Berhasil Di Ubah")
                router.push("/dashboard/profile/edit_profile")
            } else {
                message.error("Upss ada kesalahan saat Mengedit Password")
            }
        
        } catch (err) {
            console.log('error nya adalah', err);
        }
    }

    useAuthenticatedPage()

    return (
        <>
        <Head>
            <title>MyFuniture | Edit Password</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90 }}>
                    <h4 className="text-gray-600">Edit Password</h4>
                    <div className="card shadow">
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
                                <button type="button" onClick={EditPasswordSubmit} className="btn btn-success" style={{ marginLeft: 148 }}>Simpan</button>
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
export default EditPassword;