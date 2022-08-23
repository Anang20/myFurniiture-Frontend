import { faAddressCard, faLock, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import avatar from "../../public/images/profile.svg";
import Link from "next/link";
import { Row } from "antd";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import appConfig from "../../config/app";
import axios from "axios";

const SideBarCustomer = () => {
    const router = useRouter()
    const [nama, setNama] = useState([]);
    const [foto, setFoto] = useState([]);

    const getDataUser = () => {
        try {
            const token = localStorage.getItem('accessToken');
            const decode = jwtDecode(token)

            const id = decode.query["id_user"];
            const endpoint = `${appConfig.apiUrl}/users/cari_user/${id}`;

            axios.get(endpoint).then((value) => {
                const dataUser = value.data.data
                setNama(dataUser);
                setFoto(dataUser.foto)
            });
        } catch (err) {
            console.log(err);
        }
    }
    console.log(foto);

    useEffect(() => {
        getDataUser()
    }, [])

    const logoutClick = () => {
        localStorage.removeItem('accessToken');
        router.push('/auth/login')
        window.alert('Berhasil Logout')
    }
    return (
        <>
            <div className="col-2" style={{ display: 'flex', alignItems: "center", flexDirection: 'column', backgroundColor: '#00B8B0', maxHeight: '100%' }}>
                <div style={{ marginTop: 30 }}>
                    {foto == null
                    ? <Image src={avatar} width={118} height={118} alt="avatar" style={{ borderRadius: '100%'}}/>
                    : <Image src={`${appConfig.apiUrl}/file/${foto}`} width={118} height={118} alt="avatar" style={{ borderRadius: '100%'}}/>
                    }
                </div>
                <span className="text-light" style={{ marginTop: 15, marginBottom: 15, textAlign: 'center' }}>{nama.nama_lengkap}</span>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link href="/customer/profile/edit-profile-customer">
                        <a style={{ color: 'white', marginBottom: 12, textDecoration: 'none' }}><FontAwesomeIcon icon={faUser} style={{ marginRight: 10}}/>Profile</a>
                    </Link>
                    <Link href="/customer/profile/edit-password-customer">
                        <a style={{ color: 'white', marginBottom: 12, textDecoration: 'none' }}><FontAwesomeIcon icon={faLock} style={{ marginRight: 10}}/>Password</a>
                    </Link>
                    <Link href="/customer/profile/alamat-customer">
                        <a style={{ color: 'white', marginBottom: 12, textDecoration: 'none' }}><FontAwesomeIcon icon={faAddressCard} style={{ marginRight: 10}}/>Alamat</a>
                    </Link>
                        <a style={{ color: 'white' }} onClick={logoutClick}><FontAwesomeIcon icon={faSignOut} style={{ marginRight: 10}}/>Logout</a>
                </div>
            </div>
        </>
    )
}
export default SideBarCustomer;