import Head from "next/head";
import Link from "next/link";
import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import axios from "axios";
import appConfig from "../../../config/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { message } from "antd";

const TambahAlamat = () => {

    const [provinsi, setProvinsi] = useState([])
    const [provinsiId, setProvinsiId] = useState('');
    const [kota, setKota] = useState('');
    const [kotaId, setKotaId] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kecamatanId, setKecamatanId] = useState('')
    const [kelurahan, setKelurahan] = useState('')
    const [kelurahanId, setKelurahanId] = useState('');
    const [detailAlamat, setDetailAlamat] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longtitude, setLongtitude] = useState('')
    const [userId, setUserId] = useState([]);

    const router = useRouter()

    const getDataUser = () => {
        try {
            const token = localStorage.getItem('accessToken');
            const decode = jwtDecode(token)

            const id = decode.query["id_user"];
            const endpoint = `${appConfig.apiUrl}/users/cari_user/${id}`;

            axios.get(endpoint).then((value) => {
                const dataUser = value.data.data
                console.log(dataUser);
                setUserId(dataUser);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDataUser()
    }, [])
    
    useEffect(() => {
        const getProvinsi = async () => {
            try {
                const res = await axios.get(`${appConfig.apiUrl}/users/provinsi/provinsi`)
                const result = await res.data.data
                setProvinsi(result)
            } catch (err) {
                console.log('errornya', err);
            }
        }
        getProvinsi()
    }, [])

    const handleProvinsi = async (event) => {
        const getProvinsiId = await event.target.value;
        setProvinsiId(getProvinsiId);
    }

    useEffect(() => {
        const getKota = async () => {
            try {
                const res = await axios.get(`${appConfig.apiUrl}/users/kota/${provinsiId}`)
                console.log("resss", res)
                const result = res?.data?.data[0]?.kota
                setKota(result)
            } catch (err) {
                console.log('errornya', err);
            }
        }
        getKota()
    }, [provinsiId])

    const handleKota = async (event) => {
        const getKotaId = await event.target.value;
        setKotaId(getKotaId);

    }

    useEffect(() => {
        const getKecamatan = async () => {
            try {
                const res = await axios.get(`${appConfig.apiUrl}/users/kecamatan/${kotaId}`)
                const result = res.data.data[0].kecamatan
                console.log(result, 'ini get kecamatan');
                setKecamatan(result)
            } catch (err) {
                console.log('errornya', err);
            }
        }
        getKecamatan()
    }, [kotaId])

    const handleKecamatan = async (event) => {
        const getKecamatanId = await event.target.value;
        setKecamatanId(getKecamatanId);
    }
    
    useEffect(() => {
        const getKelurahan = async () => {
            try {
                const res = await axios.get(`${appConfig.apiUrl}/users/kelurahan/${kecamatanId}`)
                const result = res.data.data[0].kelurahan
                console.log(result, 'ini get kelurahan');
                setKelurahan(result)
            } catch (err) {
                console.log('errornya', err);
            }
        }
        getKelurahan();
    }, [kecamatanId])

    const handleKelurahan = async (event) => {
        const getKelurahanId = await event.target.value;
        setKelurahanId(getKelurahanId)
    }

    const handleUserId = (event) => {
        const value = event.target.value
        setUserId(value)
    }
    
    const handleDetailAlamat = (event) => {
        const value = event.target.value
        setDetailAlamat(value)
    }

    const handleLatitude = (event) => {
        const value = event.target.value
        setLatitude(value)
    }

    const handleLongtitude = (event) => {
        const value = event.target.value
        setLongtitude(value)
    }


    const tambahAlamatSubmit = async () => {
        try {
            const response = await axios.post(`${appConfig.apiUrl}/users/create_alamat`, {id_kelurahan: kelurahanId, id_user: userId.id_user, alamat: detailAlamat, latitude, longtitude})
            console.log(response)
           
                if (response.status == 201 || response.status == 200) {
                    router.push("/dashboard/profile/alamat")
                    message.success("Alamat Berhasil Ditambahkan")
                } else {
                    message.error("Upss ada kesalahan saat menambahkan alamat")
                }
        
        } catch (err) {
            console.log('error nya adalah', err);
        }
    }

    return (
        <>
        <Head>
            <title>MyFuniture | Tambah Alamat</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid">
                    <h4 className="text-gray-600">Tambah Alamat</h4>
                    <div className="card shadow">
                        <div className="card-body">

                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Provinsi</label>
                            <div className="col-sm-9">
                                <select name="provinsi" className="form-select" onChange={(e) => handleProvinsi(e)} aria-label="Default select example">
                                    <option defaultValue={'Pilih Provinsi'}>-- Pilih Provinsi --</option>
                                    {
                                        provinsi[0]?.map((getProv, index) => (
                                            <option key={index} value={getProv.id_provinsi}>{getProv.nama_provinsi}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Kota</label>
                            <div className="col-sm-9">
                                <select name="kota" className="form-select" onChange={(e) => handleKota(e)} aria-label="Default select example">
                                    <option defaultValue={'Pilih Kota'}>-- Pilih Kota --</option>
                                    {
                                        (kota || []).map((getKot, index) => (
                                            <option key={index} value={getKot.id_kota}>{getKot.nama_kota}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Kecamatan</label>
                            <div className="col-sm-9">
                                <select name="kecamatan" className="form-select" onChange={(e) => handleKecamatan(e)} aria-label="Default select example">
                                    <option defaultValue={'Pilih Kecamatan'}>-- Pilih Kecamatan --</option>
                                    {
                                        (kecamatan || []).map((getKec, index) => (
                                            <option key={index} value={getKec.id_kecamatan}>{getKec.nama_kecamatan}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="nama_lengkap" className="col-sm-2 col-form-label">Kelurahan</label>
                            <div className="col-sm-9">
                                <select name="kelurahan" className="form-select" onChange={(e) => handleKelurahan(e)} aria-label="Default select example">
                                    <option defaultValue={'Provinsi'}>-- Piih Kelurahan --</option>
                                    {
                                        (kelurahan || []).map((getKel, index) => (
                                            <option key={index} value={getKel.id_kelurahan}>{getKel.nama_kelurahan}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                            <form>
                                <div className="row mb-3">
                                    <div className="col-sm-9">
                                        <input type="hidden" className="form-control" value={kelurahanId} onChange={handleKelurahan} readOnly required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-9">
                                        <input type="hidden" className="form-control" value={userId.id_user} onChange={handleUserId} readOnly required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="foto" className="col-sm-2 col-form-label">Detail Nama Jalan RT/RW</label>
                                    <div className="col-sm-9">
                                        <textarea name="alamat" className="form-control" value={detailAlamat} onChange={handleDetailAlamat} cols={30} rows={5} required></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-sm-2 col-form-label">Latitude</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" value={latitude} onChange={handleLatitude} placeholder="Masukkan Latitude dari google maps" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-sm-2 col-form-label">Longtitude </label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" value={longtitude} onChange={handleLongtitude} placeholder="Masukkan Lontiude dari google maps" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-5">
                                        <Link href="/customer/profile/alamat-customer">
                                            <a className="btn btn-warning mr-3">Cancel</a>
                                        </Link>
                                        <button type="button" onClick={tambahAlamatSubmit} className="btn btn-success">Simpan</button>
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
export default TambahAlamat;