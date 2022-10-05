import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import StateContext from "../context/StateContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //TODO: Add loading spinner
  
  // useEffect(() => {
  //   const handleShowLoading = (url) => (url != router.asPath) && setLoading(true);
  //   const handleHideLoading = (url) => (url == router.asPath) && setLoading(false);
  //   router.events.on("routeChangeStart", handleShowLoading);
  //   router.events.on("routeChangeComplete", handleHideLoading);
  //   router.events.on("routeChangeError", handleHideLoading);

  //   return () => {
  //     router.events.off("routeChangeStart", handleShowLoading);
  //     router.events.off("routeChangeComplete", handleHideLoading);
  //     router.events.off("routeChangeError", handleHideLoading);
  //   };
  // }, []);

  return (
    <StateContext >
      {loading && <Loading />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
const Loading = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(128, 128, 128, 0.47)",
      zIndex: 3,
      pointerEvents: "none",
    }}
  ></div>
);

export default MyApp;
