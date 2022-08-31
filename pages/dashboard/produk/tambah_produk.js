import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import Head from "next/head";
import Link from "next/link";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import Swal from "sweetalert2";

const TambahProduk = () => {

    const [nama_produk, setNamaProduk] = useState([])
    const [gambar, setGambar] = useState([])
    const [harga, setHarga] = useState([])
    const [deskripsi, setDeskripsi] = useState([])
    const [stok, setStok] = useState([])

    const onChangeNamaProduk = (e) => {
        const value = e.target.value
        setNamaProduk(value)
    }

    const onChangeGambar = async (e) => {
        const value = e.target.files[0] 
        const data = {
            file : value
        }
        try{
            const res = await axios.post("http://localhost:3222/file/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setGambar(res.data.data.filename)
        } catch(err){

        }
    }

    const onChangeHarga = (e) => {
        const value = e.target.value
        setHarga(value)
    }

    const onChangeDeskripsi = (e) => {
        const value = e.target.value
        setDeskripsi(value)
    }

    const onChangeStok = (e) => {
        const value = e.target.value
        setStok(value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()

    const tambahProdukSubmit = async () => {
        try {
            const data = {
            'nama_produk': nama_produk,
            'gambar': gambar,
            'harga': harga,
            'deskripsi': deskripsi,
            'stok': stok,
            }

            const res = await axios.post("http://localhost:3222/produk", data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            Swal.fire("Berhasil", "Berhasil Menambahkan Produk", "success")
            router.push('/dashboard/produk')

    }catch(e){
        Swal.fire("Gagal", "Gagal Menambahkan Produk", "error")
    }}

    useAuthenticatedPage()
    
    return (
        <>
        <Head>
            <title>MyFuniture | Tambah Produk</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90 }}>
                    <h4 className="text-gray-600">Tambah Produk</h4>
                    <div className="card shadow">
                        <div className="card-body">

                            <form onSubmit={onFormSubmit} method="POST">
                                <div className="row mb-3">
                                    <label htmlFor="gambar" className="col-sm-2 col-form-label">Gambar</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" onChange={onChangeGambar}  />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="nama_produk" className="col-sm-2 col-form-label">Nama Produk</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" onChange={onChangeNamaProduk} placeholder="Masukkan Nama Produk" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="harga" className="col-sm-2 col-form-label">Harga</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" onChange={onChangeHarga} placeholder="Masukkan Harga" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="deskripsi" className="col-sm-2 col-form-label">Deskripsi</label>
                                    <div className="col-sm-9">
                                    <textarea name="deskripsi" className="form-control" onChange={onChangeDeskripsi} cols={30} rows={5} required></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="stok" className="col-sm-2 col-form-label">Stok</label>
                                    <div className="col-sm-9">
                                        <input type="number" pattern="[0-9]{5}" className="form-control" onChange={onChangeStok} placeholder="0" name="stok" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-5">
                                        <Link href="/dashboard/produk">
                                            <a className="btn btn-warning mr-3">Cancel</a>
                                        </Link>
                                        <button type="submit" className="btn btn-success" onClick={tambahProdukSubmit}>Tambah</button>
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
export default TambahProduk;