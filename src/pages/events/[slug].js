import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "../../styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
export default function Events({ data, slug }) {
  console.log(data.attributes.image.data.attributes.formats.thumbnail.url);
  const deleteEvent = (e) => {
    console.log("delete");
  };
  console.log(slug);
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${data.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            {" "}
            <FaTimes />
            Delete Event
          </a>
        </div>
        <span>{`${new Date(data.attributes.date).toLocaleDateString(
          "en-US"
        )}  at ${data.attributes.time}`}</span>
        <h1>{data.attributes.name}</h1>
        {data.attributes.image && (
          <div className={styles.image}>
            <Image
              src={data.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers</h3>
        <p>{data.attributes.performers}</p>
        <h3>Description</h3>
        <p>{data.attributes.description}</p>
        <h3>Venue: {data.attributes.venue}</h3>
        <p>{data.attributes.address}</p>

        <Link href="/events" className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`
  );
  const events = await res.json();
  const { data } = events;

  const paths = data.map((dataItem) => ({
    params: { slug: dataItem.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`
  );
  const events = await res.json();
  const eventData = events.data.find((event) => event.attributes.slug === slug);

  return {
    props: {
      data: eventData,
      slug,
    },
    revalidate: 1,
  };
}
