import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/images/logo-black.png'
import styles from '../../styles/Home.module.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" background-color='#ffff'>
            <div className="container">
                <a className="navbar-brand">
                    <Image src={logo} width={227} height={54} alt={"logo"}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link href="/">
                            <a className={styles["nav-link"]}>Beranda</a>
                        </Link>
                        <Link href="#">
                            <a className={styles["nav-link"]}>Tentang Kami</a>
                        </Link>
                        <Link href="#">
                            <a className={styles["nav-link"]}>Produk</a>
                        </Link>
                        <Link href="/../login">
                            <a className={styles["nav-link"]} style={{ fontWeight: 600 }}>Masuk</a>
                        </Link>
                        <Link href="/../register">
                            <button className={styles["button-register"]}>Daftar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;