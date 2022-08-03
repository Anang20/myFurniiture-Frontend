import styles from "../../styles/Home.module.css";
import Image from "next/image";
import almari from "../../public/images/almari.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const CardHome = () => {

    const [detailProduk, setDetailProduk] = useState();

    const getProduk = async () => {
        const dataProduk = await axios.get("http://localhost:3222/produk");
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
                <h3 className="mt-3">Rekomendasi</h3>
                {detailProduk?.map((value) => {
                    return (
                        <>
                            <div className="col-lg-3">
                                <div className="card" style={{ width: 270, marginRight: 22, marginTop: 40 }}>
                                    <Image src={almari} className="card-img-top" alt="almari"/>
                                    <div className="card-body">
                                        <h5>{value["nama_produk"]}</h5>
                                        <p>{value.harga}</p>
                                        <Link href="../detail-produk">
                                            <button className={styles["button-detail-produk"]}>Detail Produk</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
        </>
    )
}
export default CardHome;