import NavbarCustomer from "../../components/navbar_customer"
import SideBarCustomer from "../../components/sidebar-customer";
import Footer from "../../components/footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import appConfig from "../../../config/app";
import axios from "axios";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const FormEditProfile = () => {

    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState('')
    const [foto, setFoto] = useState('');
    const [nama, setNama] = useState([]);
    const [email, setEmail] = useState([]);
    const [notlp, setNoTlp] = useState([]);
    const router = useRouter();
    const getData = () => {
        try {
            const token = localStorage.getItem('accessToken');
            const decode = jwtDecode(token);
            const id = decode.query["id_user"];
            setUserId(id)
            const endpoint = `${appConfig.apiUrl}/users/cari_user/${id}`;

            axios.get(endpoint).then((res) => {
                const result = res.data.data;
                const fotos = res.data.data.foto;
                const nama_lengkap = res.data.data.nama_lengkap;
                const emails = res.data.data.email;
                const no_hp = res.data.data.no_telp;
                setFoto(fotos);
                setNama(nama_lengkap);
                setEmail(emails);
                setNoTlp(no_hp);
                setDataUser(result);
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getData();
    }, []);
    
    const editProfileSubmit = async () => {
        try {
            const response = await axios.put(`${appConfig.apiUrl}/users/${userId}`, {nama_lengkap: nama, email, no_telp: notlp, foto}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            console.log(response)        
            if (response.status == 201 || response.status == 200) {
                router.reload("/customer/profile/edit-profile-customer")
                Swal.fire("Berhasil", "Selamat Anda Berhasil Mengedit Profile", "success")
            } else {
                Swal.fire("Gagal", "Upss Ada Kesalahan Saat Mengedit, Coba Lagi", "error")
            }
        
        } catch (err) {
            console.log('error nya adalah', err);
        }
    }
    
    const onChangeNama = async (e) => {
        const value = await e.target.value;
        setNama(value)
    }
    
    const onChangeEmail = async (e) => {
        const value = await e.target.value;
        setEmail(value)
    }

    const onChangeNoTlp = async (e) => {
        const value = await e.target.value;
        setNoTlp(value)
    }

    const onChangeFoto = async (e) => {
       const value = e.target.files[0]
       const data = {
            file : value
       }
       try {
            const res = await axios.post("http://localhost:3222/file/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setFoto(res.data.data.filename)
       } catch (err) {
        console.log(err);
       }
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
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="foto" className="col-sm-2 col-form-label">Foto</label>
                            <div className="col-sm-9">
                                <input type="file" className="form-control" onChange={onChangeFoto} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Nama Lengkap</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" value={nama} onChange={onChangeNama} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" value={email} onChange={onChangeEmail} required/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="no_telp" className="col-sm-2 col-form-label">No Telephone</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" value={notlp} onChange={onChangeNoTlp} required/>
                            </div>
                        </div>
                        <button type="button" onClick={editProfileSubmit} className="btn btn-success" style={{ marginLeft: 148 }}>Simpan</button>
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