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
                        <p className={styles["deskripsi-carousel"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, enim, quam risus facilisi ipsum, nunc. Morbi amet mi eget sit varius mattis.</p>
                        <h3 className={styles["harga-carousel"]}>Rp 1.000.000</h3>
                        <div className={styles["button-group"]}>
                            <Link href="http://localhost:3000/customer/produk/03766783-8e6e-4b6b-bd95-5caf55553a5b">
                                <button className={styles["beli-produk"]}>Beli Produk</button>
                            </Link>
                            <Link href="http://localhost:3000/customer/produk/03766783-8e6e-4b6b-bd95-5caf55553a5b">
                                <button className={styles["button-selengkapnya"]}>Selengkapnya</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <Image src={carausel2} className="d-block w-100" alt="carausel-2"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h3 className={styles["title-carousel"]}>Almari Mini</h3>
                        <p className={styles["deskripsi-carousel"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, enim, quam risus facilisi ipsum, nunc. Morbi amet mi eget sit varius mattis.</p>
                        <h3 className={styles["harga-carousel"]}>Rp 2.000.000</h3>
                        <div className={styles["button-group"]}>
                            <Link href="http://localhost:3000/customer/produk/cc2b9b9c-05db-4cde-8a4c-0e614faf07e6">
                                <button className={styles["beli-produk"]}>Beli Produk</button>
                            </Link>
                            <Link href="http://localhost:3000/customer/produk/cc2b9b9c-05db-4cde-8a4c-0e614faf07e6">
                                <button className={styles["button-selengkapnya"]}>Selengkapnya</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <Image src={carausel3} className="d-block w-100" alt="carausel-3"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h3 className={styles["title-carousel"]}>Kitchen Set Minimalis</h3>
                        <p className={styles["deskripsi-carousel"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, enim, quam risus facilisi ipsum, nunc. Morbi amet mi eget sit varius mattis.</p>
                        <h3 className={styles["harga-carousel"]}>Rp 5.000.000</h3>
                        <div className={styles["button-group"]}>
                            <Link href="http://localhost:3000/customer/produk/9f299958-7245-4d3f-adbb-9843d112f869">
                                <button className={styles["beli-produk"]}>Beli Produk</button>
                            </Link>
                            <Link href="http://localhost:3000/customer/produk/9f299958-7245-4d3f-adbb-9843d112f869">
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