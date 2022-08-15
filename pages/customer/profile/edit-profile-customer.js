import NavbarCustomer from "../../components/navbar_customer"
import SideBarCustomer from "../../components/sidebar-customer";
import Footer from "../../components/footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import appConfig from "../../../config/app";
import axios from "axios";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

const FormEditProfile = () => {

    const [dataUser, setDataUser] = useState([]);
    // const [foto, setFoto] = useState('');
    // const [nama, setNama] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [notlp, setNoTlp] = useState([]);
    const getData = () => {
        try {
            const token = localStorage.getItem('accessToken');
            const decode = jwtDecode(token);
            const id = decode.query["id_user"];
            const endpoint = `${appConfig.apiUrl}/users/cari_user/${id}`;

            axios.get(endpoint).then((res) => {
                const result = res.data.data;
                setDataUser(result);
            })
        } catch (err) {
            console.log(err);
        }
    }

    // const getFoto = () => {
    //     setFoto(data.foto);
    // }

    // const getNama = () => {
    //     setNama(data.nama_lengkap);
    // }

    // const getEmail = () => {
    //     setEmail(data.email);
    // }

    // const getNoTlp = () => {
    //     setNoTlp(data.no_telp)
    // }

    useEffect(() => {
        getData();
        // getFoto();
        // getNama();
        // getEmail();
        // getNoTlp();
    }, []);

    const onChangeFoto = async (e) => {
        const value = await e.target.value;
        setDataUser(value)
    }

    const onChangeNama = async (e) => {
        const value = await e.target.value;
        setDataUser(value)
    }

    const onChangeEmail = async (e) => {
        const value = await e.target.value;
        setDataUser(value)
    }

    const onChangeNoTlp = async (e) => {
        const value = await e.target.value;
        setDataUser(value)
    }

    useAuthenticatedPage()

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
                            <label htmlFor="foto" className="col-sm-2 col-form-label">Foto</label>
                            <div className="col-sm-9">
                                <input type="file" className="form-control" value={dataUser.foto} onChange={onChangeFoto} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Nama Lengkap</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" value={dataUser.nama_lengkap} onChange={onChangeNama} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" value={dataUser.email} onChange={onChangeEmail} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="no_telp" className="col-sm-2 col-form-label">No Telephone</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" value={dataUser.no_telp} onChange={onChangeNoTlp} required/>
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