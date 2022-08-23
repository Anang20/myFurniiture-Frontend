import avatar from '../../public/images/profile.svg';
import Image from 'next/image';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import appConfig from "../../config/app";
import axios from "axios";
// import { message } from "antd";

const NavbarAdmin = () => {

    const router = useRouter()
    const [namaLengkap, setNamaLengkap] = useState([])
    const [foto, setFoto] = useState([])

    const getUserData = () => {
        try {
            const getToken = localStorage.getItem('accessToken')
            const decode = jwtDecode(getToken)

            const id = decode.query["id_user"];
            const endpoint = `${appConfig.apiUrl}/users/cari_user/${id}`;

            axios.get(endpoint).then((res) => {
                const dataUser = res.data.data
                setNamaLengkap(dataUser);
                setFoto(dataUser.foto)
            });
        } catch (err) {
            // message.error(err)
        }    // const data = decode.query
    }

    useEffect(() => {
        getUserData()
    }, [])

    const logoutClick = () => {
        localStorage.removeItem('accessToken')
        router.push('/auth/login')
        // message.success("Berhasil Logout")
    }

    return (
      <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow fixed-top" style={{ zIndex: 60 }}>
        <ul className="navbar-nav ml-auto">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small mt-3">{namaLengkap.nama_lengkap}</span>
            <li className="nav-item dropdown no-arrow">
                <div className="dropdown">
                    <div className="dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                    {foto == null
                    ? <Image src={avatar} width={40} height={40} alt="avatar" style={{ borderRadius: '100%'}}/>
                    : <Image src={`${appConfig.apiUrl}/file/${foto}`} width={40} height={40} alt="avatar" style={{ borderRadius: '100%'}}/>
                    }
                    {/* <Image src={avatar} width={40} height={40} alt={"logo"}/> */}
                    </div>
                    <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                        <li>
                            <Link href={`/dashboard/profile/edit_profile`}>
                                <a className="dropdown-item">Edit Profil</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/profile/alamat">
                                <a className="dropdown-item">Alamat</a>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logoutClick} className="dropdown-item">Logout</button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
  </>

    )
}

export default NavbarAdmin;