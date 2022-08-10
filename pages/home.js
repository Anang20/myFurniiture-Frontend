import NavbarCustomer from "./components/navbar_customer";
import Carousel from "./hero/carousel";
import CardHome from "./hero/card-home";
import Footer from "./components/footer";
import useAuthenticatedPage from "../helper/useAuthenticatedPage";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {

    const [search, setSearch] = useState('');

    const onChangeSearch = (e) => {
        const value = e.target.value
        setSearch(value)
    }

    const searchProduk = async (search) => {
        const data = await axios.get(`http://localhost:3222/produk/search/produk?search=${search}`);
        const result = data.data
        console.log(result);
        setSearch(result)
    }

    useEffect(() => {
        searchProduk()
    }, []); 
   
    useAuthenticatedPage();
    return (
        <>
            <Head>
                <title>MyFuniture | Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavbarCustomer searchProduk={searchProduk} onChangeSearch={onChangeSearch}/>
            <Carousel/>
            <div className="container-fluid" style={{ position: 'relative', marginTop: '-50px',backgroundColor: '#F5F5F5' }}>
            <CardHome/>
            </div>
            <Footer/>
        </>
    )
}

export default Home;