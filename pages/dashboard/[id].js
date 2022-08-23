import { useRouter } from "next/router";
import Dashboard from ".";

const GetIdUser = () => {
    const router = useRouter();
    const { id } = router.query
    return (
        <>
        <Dashboard/>
        </>
    )
}
export default GetIdUser;