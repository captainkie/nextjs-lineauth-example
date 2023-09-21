import { Html, Head, Main, NextScript } from "next/document";
import siteMetadata from "@/data/siteMetadata";

export default function Document() {
  return (
    <Html
      lang={siteMetadata.language}
      className="scroll-smooth"
    >
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/favicons/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicons/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicons/favicon.png"
        />
        <link
          rel="manifest"
          href="/images/favicons/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/images/favicons/favicon.png"
          color="#5bbad5"
        />
        <meta
          name="msapplication-TileColor"
          content="#000000"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </Head>
      <body className="font-ekacon text-base text-project-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
