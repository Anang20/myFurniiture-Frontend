import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import Head from "next/head";
import Link from "next/link";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

const TambahPermintaan = () => {
    
    const [nama_customer, setNamaCustsomer] = useState([])
    const [nama_produk, setNamaProduk] = useState([])
    const [jumlah, setJumlah] = useState([])

    const onChangeNamaCustomer = (e) => {
        const value = e.target.value
        setNamaCustsomer(value)
    }

    const onChangeNamaProduk = (e) => {
        const value = e.target.value
        setNamaProduk(value)
    }

    const onChangeJumlah = (e) => {
        const value = e.target.value
        setJumlah(value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()

    const tambahPermintaanSubmit = async () => {
        try {
            const data = {
            'nama_customer': nama_customer,
            'nama_produk': nama_produk,
            'jumlah': jumlah,
            }

            const res = await axios.post(`${appConfig.apiUrl}/produk`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })

    }catch(e){

    }}

    useAuthenticatedPage()
    return (
        <>
        <Head>
            <title>MyFuniture | Tambah Permintaan Produk</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid">
                    <h4 className="text-gray-600">Tambah Permintaan Produk</h4>
                    <div className="card shadow">
                        <div className="card-body">

                            <form onSubmit={onFormSubmit} method="POST">
                                <div className="row mb-3">
                                    <label htmlFor="nama_produk" className="col-sm-2 col-form-label">Nama Customer</label>
                                    <div className="col-sm-9">
                                        <select name="provinsi" className="form-select" onChange={onChangeNamaCustomer} aria-label="Default select example">
                                            <option defaultValue={'Pilih Provinsi'}>-- Pilih Nama --</option>
                                            <option value={1}>Anang Syah Amirul Haqim</option>
                                            <option value={2}>Fernanda Iqshal</option>
                                            <option value={3}>Zainuddin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="gambar" className="col-sm-2 col-form-label">Produk</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" onChange={onChangeNamaProduk} placeholder="Masukkan Nama Produk Yang Diinginkan Customer" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="harga" className="col-sm-2 col-form-label">Jumlah</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" onChange={onChangeJumlah} placeholder="Masukkan Jumlah Barang" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-5">
                                        <Link href="/dashboard/permintaan">
                                            <a className="btn btn-warning mr-3">Cancel</a>
                                        </Link>
                                        <button type="submit" className="btn btn-success" onClick={tambahPermintaanSubmit}>Tambah</button>
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
export default TambahPermintaan;