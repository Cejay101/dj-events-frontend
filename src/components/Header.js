import styles from "../styles/Header.module.css";
import Link from "next/link";
import Search from "./Search";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Dj Events</Link>
      </div>
      <Search/>
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/events/add">Add Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
