import { META } from '@/constants';
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  const isFrench = props.__NEXT_DATA__.query.lang === 'fr';
  const descriptionEn = META.description.en;
  const descriptionFr = META.description.fr;

  return (
    <Html lang={isFrench ? 'fr' : 'en'}>
      <Head>
        <meta content={isFrench ? descriptionFr : descriptionEn} name="description" />
        <link href="/favicon.ico" rel="icon" />
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/Safiro-Medium.woff2"
          rel="preload"
          type="font/woff2"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/Safiro-Regular.woff2"
          rel="preload"
          type="font/woff2"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
