import NavbarAdmin from "../../components/navbar_admin"
import SidebarAdmin from "../../components/sidebar_admin";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import appConfig from "../../../config/app";
import jwtDecode from "jwt-decode";
import { message } from "antd";
import { useRouter } from "next/router";


const ListAlamat = () => {

    // const [userId, setUserId] = useState('');
    const [alamat, setAlamat] = useState([{
        id_alamat_user : '',
        alamat:''
    }]);
    const [nama, setNama] = useState('')
    const [telp, setTelp] = useState('')
    const router = useRouter();

    useEffect(() => {
        const getAlamat = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decode = jwtDecode(token);
                const id = decode.query["id_user"];
                const endpoint = `${appConfig.apiUrl}/users/cari_alamat/${id}`;

                 await  axios.get(endpoint).then((value) => {
                    
                    const alamatUser = value.data.data.alamat
                    const id = value.data.data.alamat
                    const nama = value.data.data.nama_lengkap  
                    const telp = value.data.data.no_telp
                    setAlamat(alamatUser)
                    setNama(nama)
                    setTelp(telp)
                })
            } catch (err) {
                console.log(err);
            }
        }
        getAlamat()
    }, [])

  return (
        <>
        <div className="col-12">
            <div className="row mb-3">
                <div>
                    <h5 style={{ display: 'block', float: 'left' }}>Alamat Saya</h5>
                    <Link href="/dashboard/profile/tambah_alamat">
                        <button style={{ width: 214, height: 43, backgroundColor: '#00B8B0', color: 'white', display: 'block', float: 'right', border: 'none' }}><FontAwesomeIcon icon={faPlus} style={{ paddingRight: 5 }}/>Tambahkan Alamat Baru</button>
                    </Link>
                </div>
                <div className="col-sm-12">
                    <hr/>
                </div>
            </div>
            { alamat?.map((value) => 
            <div key={value?.id_alamat_user} className="row mb-3">
                <div className="col-4">
                    <p>Nama Lengkap</p>
                    <p>Telephone</p>
                    <p>Alamat</p>
                </div>
                <div className="col-4">
                    <p>{nama}</p>
                    <p>{telp}</p>
                    <p>{value?.alamat}</p>
                </div>
                <div className="col-4">
                    <button type="button" onClick={
                        async () => {
                            const apiDelete = `http://localhost:3222/users/alamat/${value?.id_alamat_user}`
                            console.log(apiDelete);
                                const response = await axios.delete(apiDelete)
                                console.log(response.data.statusCode)
                                if(response.data.statusCode === 200) {
                                    message.success("Alamat Berhasil Dihapus")
                                    router.reload('/customer/profile/alamat-customer')
                                }else{
                                    alert('Something Wrong')
                                }
                        }
                    } 
                    style={{ border: 'none', background: 'transparent', listStyle: 'unset' }}><a>Hapus</a></button>
                </div>
                <div className="col-sm-12">
                    <hr/>
                </div>
            </div>
            )}
        </div> 
        </>
    )
}

const Alamat = () => {
    return (
        <>
        <Head>
            <title>MyFuniture | Alamat</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <NavbarAdmin/>
                    <div className="container-fluid">
                        <h4 className="text-gray-600">Alamat</h4>
                        <div className="card shadow" style={{ minHeight: 500 }}>
                            <div className="card-body">
                                <ListAlamat/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Alamat;