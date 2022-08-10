import styles from "../../styles/Home.module.css";
import Image from "next/image";
// import {Image} from "antd";
import almari from "../../public/images/almari.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import appConfig from "../../config/app";

const CardHome = () => {

    const [detailProduk, setDetailProduk] = useState();
    const [detailGambar, setDetailGambar] = useState([]);

    const getProduk = async () => {
        const dataProduk = await axios.get(`${appConfig.apiUrl}/produk`);
        const produk = dataProduk.data.items;
        setDetailProduk(produk);
    }
    useEffect(() => {
        getProduk()
    }, []);
   
    return (
        <>
        <div className="container mt-5">
            <div className="row" style={{ backgroundColor: '#FFF' }}>
                <h3 style={{ fontWeight: 600, fontSize: 30, color: '#00B8B0' }} className="mt-3">Rekomendasi</h3>
                {detailProduk?.map((value, key) => {
                    return (
                        <>
                            <div className="col-lg-3" key={value.id_produk}>
                                <div className="card" style={{ width: 270, marginRight: 22, marginTop: 40, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 4 }}>
                                    <Image src={`${appConfig.apiUrl}/file/${value.gambar}`} width={281} height={209} className="card-img-top" alt="almari"/>
                                    <div className="card-body"> 
                                        <h5 style={{ fontWeight: 500, fontSize: 20 }}>{value["nama_produk"]}</h5>
                                        <p style={{ fontWeight: 600, fontSize: 20, color: '#00B8B0' }}>{value.harga}</p>
                                        <Link href="/detail-produk">
                                            <button className={styles["button-detail-produk"]}>Detail Produk</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-5">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}
export default CardHome;