import { useEffect } from "react";
import '../styles/globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
      import('bootstrap')
  },[])
  return <Component {...pageProps} />;
}

export default MyApp
 