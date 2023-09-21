import "@/styles/tailwind.css";
import { ClientReload } from "@/components/ClientReload";
import LayoutWrapper from "@/components/LayoutWrapper";
import siteMetadata from "@/data/siteMetadata";
import Analytics from "@/components/analytics";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { isDevelopment, isSocket, liffId } from "../../lib/constants";

export default function App({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      // console.log("LIFF init...");
      liff
        .init({ liffId: liffId })
        .then(() => {
          // console.log("LIFF init succeeded.");
          setLiffObject(liff);
        })
        .catch((error) => {
          // console.log("LIFF init failed.");
          setLiffError(error.toString());
        });
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableColorScheme={false}
    >
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
