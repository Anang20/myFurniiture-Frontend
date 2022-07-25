import avatar from '../../public/images/profile.svg';
import Image from 'next/image';
import Link from 'next/link';
const NavbarAdmin = () => {
    return (
      <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <ul className="navbar-nav ml-auto">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small mt-3">Anang Syah</span>
            <li className="nav-item dropdown no-arrow">
                <div className="dropdown">
                    <div className="dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                    <Image src={avatar} width={40} height={40} alt={"logo"}/>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                        <li>
                            <Link href="/dashboard/profile/edit_profile">
                                <a className="dropdown-item">Edit Profil</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/profile/alamat">
                                <a className="dropdown-item">Alamat</a>
                            </Link>
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