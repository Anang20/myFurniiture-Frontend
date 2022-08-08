import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import avatar from "../../public/images/profile.svg";
import Link from "next/link";
import { Row } from "antd";

const SideBarCustomer = () => {
    return (
        <>
            <div className="col-2" style={{ display: 'flex', alignItems: "center", flexDirection: 'column', backgroundColor: '#00B8B0', maxHeight: '100%' }}>
                <Image src={avatar} width={118} height={200} alt="avatar" />
                <span className="text-light" style={{ marginTop: -30, marginBottom: 15 }}>Customer</span>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link href="/edit-profile-customer">
                        <a style={{ color: 'white', marginBottom: 12 }}><FontAwesomeIcon icon={faUser} style={{ marginRight: 10}}/>Profile</a>
                    </Link>
                    <Link href="/alamat-customer">
                        <a style={{ color: 'white' }}><FontAwesomeIcon icon={faAddressCard} style={{ marginRight: 10}}/>Alamat</a>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default SideBarCustomer;