import Head from "next/head"
import Script from "next/script";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
      import('bootstrap')
  },[])
  return <Component {...pageProps} />;
}

export default MyApp
 