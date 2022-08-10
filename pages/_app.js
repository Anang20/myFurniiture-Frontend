import { useEffect } from "react";
import '../styles/globals.css';
import 'antd/dist/antd.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
config.autoAddCss = false;

axios.defaults.validateStatus = (status) => status < 500

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
      import('bootstrap')
  },[])
  return <Component {...pageProps} />;
}

export default MyApp
 