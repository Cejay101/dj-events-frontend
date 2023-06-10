import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
Layout.defaultProps = {
  title: "DJ Events || Find the Hottest Parties",
  description: "Find the latest DJ's and other musical events",
  keywords: "Music, dj, events, parties",
};
