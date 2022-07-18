import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/images/logo.png'
import styles from '../../styles/Home.module.css'

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light" background-color='#ffff'>
            <div class="container">
                <a class="navbar-brand">
                    <Image src={logo} width={227} height={54}/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <Link href="/">
                            <a className={styles["nav-link"]}>Beranda</a>
                        </Link>
                        <Link href="/testing">
                            <a className={styles["nav-link"]}>Tentang Kami</a>
                        </Link>
                        <Link href="">
                            <a className={styles["nav-link"]}>Produk</a>
                        </Link>
                        <Link href="./../login">
                            <a className={styles["nav-link"]} style={{ fontWeight: 600 }}>Masuk</a>
                        </Link>
                        <Link href="./../register">
                            <button className={styles["button-register"]}>Daftar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}