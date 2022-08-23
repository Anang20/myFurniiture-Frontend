import { useEffect } from "react";
import '../styles/globals.css';
import 'antd/dist/antd.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import NextNProgress from "nextjs-progressbar";
config.autoAddCss = false;

axios.defaults.validateStatus = (status) => status < 500

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
      import('bootstrap')
  },[])
  return (
    <>
    <NextNProgress
    color="#00B8B0"
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    showOnShallow={true}
    options={{ showSpinner: false }}
    />
    <Component {...pageProps} />;
    </>
  ) 
}

export default MyApp
 