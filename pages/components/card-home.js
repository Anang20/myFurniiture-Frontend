import Link from "next/link";
import appConfig from "../../config/app";
import styles from "../../styles/Home.module.css";
import Image from "next/image";

const CardHome = ({ produk, loading, search }) => {

    const filteredData = produk.filter((el) => {
        if (search === '') {
            return el
        } else {
            return el.nama_produk.toLowerCase().includes(search)
        }
    })

    if (loading) {
        return <h2>Loading...</h2>
    }

    const curency = (value)=>{
        const formatter = new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(value)
          .replace(/[IDR]/gi, '')
          .replace(/(\.+\d{2})/, '')
          .trimLeft()
        return formatter
    }

    return (
        <>
            <h3 style={{ fontWeight: 600, fontSize: 30, color: '#00B8B0' }} className="mt-3">Rekomendasi</h3>
            {filteredData?.map((value) => {
                return (
                    <>
                        <div className="col-lg-3" key={value.id_produk}>
                            <div className="card" style={{ width: 270, marginRight: 22, marginTop: 40, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 4 }}>
                                <Image src={`${appConfig.apiUrl}/file/${value.gambar}`} width={281} height={209} className="card-img-top" alt="almari"/>
                                <div className="card-body"> 
                                    <h5 style={{ fontWeight: 500, fontSize: 20 }}>{value["nama_produk"]}</h5>
                                    <p style={{ fontWeight: 600, fontSize: 20, color: '#00B8B0' }}>Rp {curency(value.harga)}</p>
                                    <Link href={`/customer/produk/${value.id_produk}`}>
                                        <button className={styles["button-detail-produk"]}>Detail Produk</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })} 
        </>
    )
}
export default CardHome;