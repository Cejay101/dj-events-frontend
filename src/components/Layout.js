import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>
        <Header />
        {router.pathname === "/" && <Showcase />}
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
