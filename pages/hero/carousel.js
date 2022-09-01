import Image from "next/image";
import carausel from "../../public/images/carausel-1.png";
import carausel2 from "../../public/images/carousel2.png";
import carausel3 from "../../public/images/carousel3.png";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

const Carousel = () => {
    return (
        <>
        <div id="carouselExampleCaptions" className="carousel slide h-100vh" data-bs-ride="carousel" style={{ marginTop: 65 ,backgroundColor: '#F5F5F5' }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <Image src={carausel} className="d-block" alt="carausel-1" style={{minWidth: '100%'}}/>
                    <div className="carousel-caption d-none d-md-block">
                        <h3 className={styles["title-carousel"]}>Kursi Bundar</h3>
                        <p className={styles["deskripsi-carousel"]}>Kursi Bundar Adalah Tempat Duduk Yang Cocok Untuk Anda, Tinggi 50cm Lebar 30cm Berbahan Kayu Mahoni Dan Awet.</p>
                        <h3 className={styles["harga-carousel"]}>Rp 1,000,000</h3>
                        <div className={styles["button-group"]}>
                            <Link href="http://localhost:3000/customer/produk/9f586f31-e77a-44b8-b8c8-6a7d28f29422">
                                <button className={styles["beli-produk"]}>Beli Produk</button>
                            </Link>
                            <Link href="http://localhost:3000/customer/produk/9f586f31-e77a-44b8-b8c8-6a7d28f29422">
                                <button className={styles["button-selengkapnya"]}>Selengkapnya</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <Image src={carausel2} className="d-block w-100" alt="carausel-2"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h3 className={styles["title-carousel"]}>Almari Mini</h3>
                        <p className={styles["deskripsi-carousel"]}>Simpan Pakaian Anda Didalam Almari Mini, Tinggi 150cm Lebar 90cm Berbahan Kayu Jati Berwarna Putih.</p>
                        <h3 className={styles["harga-carousel"]}>Rp 4,500,000</h3>
                        <div className={styles["button-group"]}>
                            <Link href="http://localhost:3000/customer/produk/f440b4cc-7542-4798-8e45-c1a4ade8656b">
                                <button className={styles["beli-produk"]}>Beli Produk</button>
                            </Link>
                            <Link href="http://localhost:3000/customer/produk/f440b4cc-7542-4798-8e45-c1a4ade8656b">
                                <button className={styles["button-selengkapnya"]}>Selengkapnya</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <Image src={carausel3} className="d-block w-100" alt="carausel-3"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h3 className={styles["title-carousel"]}>Kitchen Set Minimalis</h3>
                        <p className={styles["deskripsi-carousel"]}>Percantik Dapur Anda Dengan Kitchen Set Minimalis, Tinggi 200cm Lebar 250cm Berbahan Triplek Bercorak Modern Dan Berwarna Putih Cream.</p>
                        <h3 className={styles["harga-carousel"]}>Rp 8,000,000</h3>
                        <div className={styles["button-group"]}>
                            <Link href="http://localhost:3000/customer/produk/8ef18ec9-f6ea-485b-b4ba-60bf2a8101fa">
                                <button className={styles["beli-produk"]}>Beli Produk</button>
                            </Link>
                            <Link href="http://localhost:3000/customer/produk/8ef18ec9-f6ea-485b-b4ba-60bf2a8101fa">
                                <button className={styles["button-selengkapnya"]}>Selengkapnya</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
    )
}
export default Carousel;