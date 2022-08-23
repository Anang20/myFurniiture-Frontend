import NavbarCustomer from "../components/navbar_customer";
import Carousel from "../hero/carousel";
import CardHome from "../components/card-home";
import Pagination from "../components/pagination";
import Footer from "../components/footer";
import useAuthenticatedPage from "../../helper/useAuthenticatedPage";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { message } from "antd";
import appConfig from "../../config/app";

const Home = () => {

    const [search, setSearch] = useState('');
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
 
    useEffect(() => {
        const getProduk = async () => {
            const response = await axios.get(`${appConfig.apiUrl}/produk/search/produk`);
            const result = response.data.items;
            console.log(result);
            setProduk(result);
            setLoading(false)    
        }
        getProduk()
    }, []);

    const indexOfLastProduk = currentPage * itemsPerPage;
    const indexOfFirstProduk = indexOfLastProduk - itemsPerPage;
    const currentProduk = produk.slice(indexOfFirstProduk, indexOfLastProduk);
    
    const paginate = pageNumber => setCurrentPage(pageNumber)
    
    useAuthenticatedPage();
    return (
        <>
            <Head>
                <title>MyFuniture | Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavbarCustomer isInput={true}/>
            <Carousel/>
            <div className="container-fluid" style={{ position: 'relative', marginTop: '-50px',backgroundColor: '#F5F5F5' }}>
                <div className="container mt-5">
                    <div className="row" style={{ backgroundColor: '#FFF' }}>
                        <CardHome produk={currentProduk} loading={loading}/>
                        <Pagination 
                        totalProduk={produk.length} 
                        itemsPerPage={itemsPerPage} 
                        paginate={paginate}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Home;