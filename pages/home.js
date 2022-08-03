import NavbarCustomer from "./components/navbar_customer";
import Carousel from "./hero/carousel";
import CardHome from "./hero/card-home";
import Footer from "./components/footer";

const Home = () => {
    return (
        <>
            <NavbarCustomer/>
            <Carousel/>
            <div className="container-fluid" style={{ position: 'relative', marginTop: '-50px',backgroundColor: '#F5F5F5' }}>
            <CardHome/>
            </div>
            <Footer/>
        </>
    )
}

export default Home;