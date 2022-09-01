import Head from "next/head";
import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import Link from "next/link";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../../../config/app";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfileAdmin = () => {

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
            if (response.data.statusCode== 200) {
                router.reload("/dashboard/profile/edit_profile")
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
            <title>MyFuniture | Edit Profil</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundColor: '#FFFF' }}>
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90 }}>
                    <h4 className="text-gray-600">Edit Profile</h4>
                    <div className="card shadow">
                        <div className="card-body">

                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Nama Lengkap</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" value={nama} onChange={onChangeNama} name="nama_lengkap" placeholder="Ubah Nama" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" value={email} onChange={onChangeEmail} name="email" placeholder="Ubah Email" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="no_telp" className="col-sm-2 col-form-label">No. Telephone</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" value={notlp} onChange={onChangeNoTlp} name="no_telp" placeholder="Ubah Nomor Telephone" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="foto" className="col-sm-2 col-form-label">Foto</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" onChange={onChangeFoto} name="foto" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-5">
                                        <Link href="/dashboard">
                                            <a className="btn btn-warning mr-3">Cancel</a>
                                        </Link>
                                        <button type="button" onClick={editProfileSubmit} className="btn btn-success">Update</button>
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
export default EditProfileAdmin;