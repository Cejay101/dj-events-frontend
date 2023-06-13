import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "../../styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
export default function Events({ evt }) {
  console.log(evt);
  const deleteEvent = (e) => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            {" "}
            <FaTimes />
            Delete Event{" "}
          </a>
        </div>
        <span>{`${evt.date} at ${evt.time}`}</span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events" className={styles.back}>{'<'} Go Back</Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log(slug);
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const event = await res.json();

  return { props: { evt: event[0] }, revalidate: 1 };
}

// export async function getServerSideProps({ query: { slug } }) {
//   console.log(slug);
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const event = await res.json();

//   return { props: {evt:event[0]} };
// }