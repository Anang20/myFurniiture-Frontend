import { faChair, faHandHoldingUsd, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarAdmin from "../components/navbar_admin";
import SidebarAdmin from "../components/sidebar_admin";

const Dashboard = () => {
    return (
        <>
         <div id="wrapper">
            <SidebarAdmin/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                    <NavbarAdmin/>
                    <div className="container">
                        <h4 className="text-gray-600">Dashboard</h4>
                        <div className="row">
                            <div className="col-xl-4 col-md-6 mb-4">
                                <div className="card shadow h-100 py-2" style={{ borderRadius: 30 }}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center mt-2">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-gray-800 text-uppercase mb-1 pl-3">
                                                    Total Produk
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800 pl-3">20 Produk</div>
                                            </div>
                                            <div className="col-auto pr-3">
                                               <FontAwesomeIcon
                                               icon={faChair}
                                               color={'#A68787'}
                                               style={{ width: 45, height: 45 }}
                                               />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-md-6 mb-4"style={{ height: 120 }}>
                                <div className="card shadow h-100 py-2" style={{ borderRadius: 30 }}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center mt-2">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-gray-800 text-uppercase mb-1 pl-3">
                                                    Total Anggota
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800 pl-3">20 Anggota</div>
                                            </div>
                                            <div className="col-auto pr-3">
                                               <FontAwesomeIcon
                                               icon={faUsers}
                                               color={'#926EF9'}
                                               style={{ width: 45, height: 45 }}
                                               />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-md-6 mb-4">
                                <div className="card shadow h-100 py-2" style={{ borderRadius: 30 }}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center mt-2">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-gray-800 text-uppercase mb-1 pl-3">
                                                    Total Transaksi
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800 pl-3">20 Transaksi</div>
                                            </div>
                                            <div className="col-auto pr-3">
                                               <FontAwesomeIcon
                                               icon={faHandHoldingUsd}
                                               color={'#00B8B0'}
                                               style={{ width: 45, height: 45 }}
                                               />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    </div>
                </div>
        </div>
        </>
    )
}
export default Dashboard;