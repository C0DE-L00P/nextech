import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../components";
import StateContext from "../context/StateContext";
import "../styles/globals.css";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
  }, []);

  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
