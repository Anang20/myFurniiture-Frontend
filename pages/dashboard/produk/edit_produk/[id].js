import Head from "next/head";
import NavbarAdmin from "../../../components/navbar_admin";
import SidebarAdmin from "../../../components/sidebar_admin";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import appConfig from "../../../../config/app";

const EditProduk = () => {

    const {query} = useRouter() 
    const produkId = query.id

    // const [dataById, setDataById] = useState([])
    const [nama_produk, setNamaProduk] = useState([])
    const [gambar, setGambar] = useState([])
    const [harga, setHarga] = useState([])
    const [deskripsi, setDeskripsi] = useState([])
    const [stok, setStok] = useState([])

    const endpoint = axios.get(`${appConfig.apiUrl}/produk/${produkId}`)

    const getNamaProduk = async () => {
        const res = await endpoint;
        const namaProduk = res.data.data.nama_produk;
        console.log(namaProduk)
        setNamaProduk(namaProduk);
    }
    useEffect(() => {
        getNamaProduk()
    }, []);

    const getGambar = async () => {
        const res = await endpoint;
        const gambarProduk = res.data.data.gambar;
        console.log(gambarProduk)
        setGambar(gambarProduk);
    }
    useEffect(() => {
        getGambar()
    }, []);

    const getHarga = async () => {
        const res = await endpoint;
        const hargaProduk = res.data.data.harga;
        console.log(hargaProduk)
        setHarga(hargaProduk);
    }
    useEffect(() => {
        getHarga()
    }, []);

    const getDeskripsi = async () => {
        const res = await endpoint
        const deskripsiProduk = res.data.data.deskripsi;
        console.log(deskripsiProduk)
        setDeskripsi(deskripsiProduk);
    }
    useEffect(() => {
        getDeskripsi()
    }, []);

    const getStok = async () => {
        const res = await endpoint
        const stokProduk = res.data.data.stok;
        console.log(stokProduk)
        setStok(stokProduk);
    }
    useEffect(() => {
        getStok()
    }, []);


    const onChangeNamaProduk = (e) => {
        const value = e.target.value
        setNamaProduk(value)
    }

    const onChangeGambar = async (e) => {
        const value = e.target.files[0]
        const data = {
            file: value
        }
        try {
            const res = await axios.post(`http://localhost:3222/file/upload/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            console.log(res, resnya)
            setGambar(res.data.data.filename)
        } catch(err) {

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

    const editProdukSubmit = async () => {
        try {
            const data = {
                'id_produk' : produkId,
                'nama_produk' : nama_produk,
                'gambar' : gambar,
                'harga' : harga,
                'deskripsi' : deskripsi,
                'stok' : stok,
            }

            const res = await axios.put(`http://localhost:3222/produk/${produkId}`, data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
        } catch (e) {

        }
    }

    return (
        <>
        <Head>
            <title>MyFuniture | Edit Produk</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <NavbarAdmin/>
                <div className="container-fluid">
                    <h4 className="text-gray-600">Edit Produk</h4>
                    <div className="card shadow">
                        <div className="card-body">

                            <form onSubmit={onFormSubmit} method="POST">
                                <div className="row mb-3">
                                    <div className="col-sm-9">
                                        <input type="hidden" value={produkId} className="form-control" name="id_produk" required readOnly/>
                                    </div>
                                </div>
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
                                        <button type="submit" className="btn btn-success" onClick={editProdukSubmit}>Update</button>
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