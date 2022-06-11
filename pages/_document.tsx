import { Html, Head, Main, NextScript } from "next/document";

export default () => (
  <Html>
    <Head>
      <title>dpotify</title>
      <meta name="description" content="monoffe sounds" />
    </Head>{" "}
    <body
      style={{
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Main />
      <NextScript />
    </body>
  </Html>
);
