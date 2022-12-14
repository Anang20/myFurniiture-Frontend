import Link from "next/link";
import Image from "next/image";
import logo from '../../public/images/logo-black.png';
import styles from '../../styles/Home.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import appConfig from "../../config/app";

const NavbarCustomer = (props) => {
    const { isInput, search } = props
    const [cart, setCart] = useState('')

    useEffect(() => {
        const getDataCart = async () => {
            try {
                const token = localStorage.getItem('accessToken')
                const decode = jwtDecode(token)
                const userId = decode.query["id_user"]
                const endpoint = `${appConfig.apiUrl}/cart/${userId}`;
                const items = await axios.get(endpoint)
                const result = items.data.data
                setCart(result);
            } catch (e) {
                console.log(e);
            }
        }
        getDataCart()
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className="container">
                <a className="navbar-brand">
                    <Link href="/customer/">
                        <Image src={logo} width={227} height={54} alt={"logo"}/>
                    </Link>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {isInput && <div className={styles.search}>
                        <FontAwesomeIcon icon={faSearch}
                        color={'rgba(0, 0, 0, 0.09)'}/>
                     <input type="text" className={styles["search-input"]} placeholder="Quick Search" onChange={search}/>
                    </div>
                    }
                    <div className="navbar-nav ms-auto">
                        <Link href="/customer/">
                            <a className={styles["nav-link"]}>Home</a>
                        </Link>
                        <Link href="https://wa.me/089524783056?text=Saya%20ingin%20request%20produk%20furniture%20yang%20belum%20ada%20di%20aplikasi%20Anda">
                            <a target="_blank" className={styles["nav-link"]}>Request</a>
                        </Link>
                        <Link href="/customer/riwayat">
                            <a className={styles["nav-link"]}>History</a>
                        </Link>
                        <Link href="/customer/profile/edit-profile-customer">
                            <a className={styles["nav-link"]}><FontAwesomeIcon
                            icon={faUser}/>
                            </a>
                        </Link>
                        <Link href="/customer/produk/cart">
                            <a className={styles["nav-link"]}><FontAwesomeIcon
                            icon={faCartShopping}/>
                            {cart.length == [] ? ''  
                            :<div style={{ height: 20, width: 20, backgroundColor: '#00B8B0', borderRadius: 50, marginLeft: -10, marginTop: -15 }}>
                                <p style={{ fontSize: 12, color: 'white', textAlign: "center", marginTop: -5 }}>{cart.length}</p>
                            </div>
                            }
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarCustomer;