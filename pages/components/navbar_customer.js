import Link from "next/link";
import Image from "next/image";
import logo from '../../public/images/logo-black.png';
import styles from '../../styles/Home.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const NavbarCustomer = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className="container">
                <a className="navbar-brand">
                    <Link href="/home">
                        <Image src={logo} width={227} height={54} alt={"logo"}/>
                    </Link>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className={styles.search}>
                        <FontAwesomeIcon icon={faSearch}
                        color={'rgba(0, 0, 0, 0.09)'}/>
                    <input type="text" className={styles["search-input"]} placeholder="Quick Search"/>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <Link href="/home">
                            <a className={styles["nav-link"]}>Home</a>
                        </Link>
                        <Link href="tentang-kami">
                            <a className={styles["nav-link"]}>Request</a>
                        </Link>
                        <Link href="#">
                            <a className={styles["nav-link"]}>History</a>
                        </Link>
                        <Link href="#">
                            <a className={styles["nav-link"]}><FontAwesomeIcon
                            icon={faUser}/>
                            </a>
                        </Link>
                        <Link href="../cart">
                            <a className={styles["nav-link"]}><FontAwesomeIcon
                            icon={faCartShopping}/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarCustomer;