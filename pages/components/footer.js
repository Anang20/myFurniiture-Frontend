import styles from './../../styles/Home.module.css';
import logo from './../../public/images/logo-white.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className='container'>
                <div className='row'>
                    <div className={styles["footer-content"]}>
                        <div className={styles.brand}>
                            <Image src={logo} alt={'logo'} className={styles["logo-brand"]}/>
                            <p>Ubah ruangan anda dengan lebih banyak furnitur minimalis dan modern dengan mudah dan cepat</p>
                        </div>
                        <div className={styles.page}>
                            <h5>Halaman</h5>
                            <ul>
                                <li>
                                    <Link href='#'>
                                        <a>Beranda</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a>Tentang Kami</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a>Beranda</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.contact}>
                            <h5>Hubungi Kami</h5>
                            <p>Anda memiliki pertanyaan dan ingin bertanya kepada kami? Hubungi kami melalui platform berikut</p>
                            <span style={{ fontSize: 18, color: '#9DA2AA' }}><FontAwesomeIcon icon={faPhone} /> 089670068639</span> <br />
                            <div className={styles['icon-footer']}>
                                <span><FontAwesomeIcon icon={faFacebookF} /></span>
                                <span><FontAwesomeIcon icon={faTwitter} /></span>
                                <span><FontAwesomeIcon icon={faInstagram} /></span>
                            </div>
                        </div>
                    </div>
                    <p className={styles['copy-right']}>&copy; copyright MyFurniture 2022</p>
                </div>
            </div>
        </div>
    )
}
export default Footer;