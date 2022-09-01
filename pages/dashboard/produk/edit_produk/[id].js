import Head from "next/head";
import NavbarAdmin from "../../../components/navbar_admin";
import SidebarAdmin from "../../../components/sidebar_admin";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import appConfig from "../../../../config/app";
import useAuthenticatedPage from "../../../../helper/useAuthenticatedPage";

const EditProduk = () => {

    const {query} = useRouter() 
    const id = query.id
    const router = useRouter();

    const [produkId, setProdukId] = useState([])
    const [nama_produk, setNamaProduk] = useState([''])
    const [gambar, setGambar] = useState([''])
    const [harga, setHarga] = useState([''])
    const [deskripsi, setDeskripsi] = useState([''])
    const [stok, setStok] = useState([''])

    useEffect(() => {
        const getDataProduk = async () => {
            try {
                const endpoint = `${appConfig.apiUrl}/produk/${id}`
                axios.get(endpoint).then((res) =>{
                    const dataProduk = res.data.data
                    setProdukId(dataProduk.id_produk)
                    setNamaProduk(dataProduk.nama_produk)
                    setGambar(dataProduk.gambar)
                    setHarga(dataProduk.harga)
                    setDeskripsi(dataProduk.deskripsi)
                    setStok(dataProduk.stok)
                }).catch((e) => {
                    console.log(e);
                })
            } catch (e) {
                console.log(e);
            }
        }
        getDataProduk()
    }, [])
    
    const onChangeNamaProduk = async (e) => {
        const value = await e.target.value
        setNamaProduk(value)
    }

    const onChangeGambar = async (e) => {
        const value = e.target.files[0]
        const data = {
            file: value
        }
        try {
            const res = await axios.post(`${appConfig.apiUrl}/file/upload/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setGambar(res.data.data.filename)
        } catch(err) {

        }
    }

    const onChangeHarga = async (e) => {
        const value = await e.target.value
        setHarga(value)
    }

    const onChangeDeskripsi = async (e) => {
        const value = await e.target.value
        setDeskripsi(value)
    }

    const onChangeStok = async (e) => {
        const value = await e.target.value
        setStok(value)
    }

    const editProdukSubmit = async () => {
        try {

            const res = await axios.put(`${appConfig.apiUrl}/produk/${produkId}`, {nama_produk, gambar, harga, deskripsi, stok}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            if (res.data.statusCode == 200) {
                Swal.fire("Berhasil", "Berhasil Mengedit Produk", "success")
                router.push("/dashboard/produk")
            } else {
                Swal.fire("Gagal", "Upss Gagal Mengedit Produk", "error")
            }
        } catch (e) {

        }
    }

    useAuthenticatedPage()

    return (
        <>
        <Head>
            <title>MyFuniture | Edit Produk</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundColor: '#FFFF' }}>
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90 }}>
                    <h4 className="text-gray-600">Edit Produk</h4>
                    <div className="card shadow">
                        <div className="card-body">

                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="nama_produk" className="col-sm-2 col-form-label">Nama Produk</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" value={nama_produk} onChange={onChangeNamaProduk} placeholder="Masukkan Nama Produk" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="gambar" className="col-sm-2 col-form-label">Gambar</label>
                                    <div className="col-sm-9">
                                        <Image src={`${appConfig.apiUrl}/file/${gambar}`} width={98} height={98}/>
                                        <input type="file" className="form-control" onChange={onChangeGambar} required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="harga" className="col-sm-2 col-form-label">Harga</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" value={harga} onChange={onChangeHarga} placeholder="Masukkan Harga" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="deskripsi" className="col-sm-2 col-form-label">Deskripsi</label>
                                    <div className="col-sm-9">
                                        <textarea name="deskripsi" className="form-control" value={deskripsi} onChange={onChangeDeskripsi} cols={30} rows={5} required></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="stok" className="col-sm-2 col-form-label">Stok</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" value={stok} onChange={onChangeStok} required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-5">
                                        <Link href="/dashboard/produk">
                                            <a className="btn btn-warning mr-3">Cancel</a>
                                        </Link>
                                        <button type="button" className="btn btn-success" onClick={editProdukSubmit}>Update</button>
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
export default EditProduk;