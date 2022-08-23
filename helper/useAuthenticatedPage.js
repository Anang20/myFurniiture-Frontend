import { useRouter } from "next/router";

const useAuthenticatedPage = () => {
    const router = useRouter();
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        if (!localStorage.getItem("accessToken")) {
            window.location.href = "/auth/login";
        }
    }
};

export default useAuthenticatedPage;