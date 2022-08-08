import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCouch,
  faFile,
  faHandHolding,
  faHandshake,
  faHome,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import logo from '../../public/images/logo-white.png'
import Image from "next/dist/client/image";
import Link from 'next/link';

const SidebarAdmin = () => {
    return (
        <>
        <div id="wrapper" style={{ backgroundColor: '#00B8B0' }}>
        <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

          <a className="sidebar-brand d-flex align-items-center justify-content-center">
              <div className="sidebar-brand-text mx-3"><Image src={logo} alt={"logo"} priority/></div>
          </a>

          <li className="nav-item">
            <Link href="/dashboard">
              <a className="nav-link">
                <FontAwesomeIcon icon={faHome} style={{ width: 28, height: 28 }}/>
                <span className="text-card pl-2" style={{ top: 100 }}>Dashboard</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/dashboard/produk">
              <a className="nav-link">
                <FontAwesomeIcon icon={faCouch} style={{ width: 28, height: 28 }}/>
                <span className="pl-2">Produk</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/dashboard/order">
              <a className="nav-link">
                <FontAwesomeIcon icon={faShoppingCart} style={{ width: 28, height: 28 }}/>
                <span className="pl-2">Order</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/dashboard/permintaan">
              <a className="nav-link">
                <FontAwesomeIcon icon={faHandHolding} style={{ width: 28, height: 28 }}/>
                <span className="pl-2">Permintaan</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/dashboard/terima_pembayaran">
              <a className="nav-link">
                <FontAwesomeIcon icon={faHandshake} style={{ width: 28, height: 28 }}/>
                <span className="pl-2">Terima Pembayaran</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/dashboard/laporan_transaksi">
              <a className="nav-link">
                <FontAwesomeIcon icon={faFile} style={{ width: 28, height: 28 }}/>
                <span className="pl-2">Laporan Transaksi</span>
              </a>
            </Link>
          </li>

          </ul>
          </div>
        </>
    )
}

export default SidebarAdmin;