import Layout from "@/components/Layout";
import EventItems from "@/components/EventItems";
import { API_URL } from "@/config"; 
import Link from "next/link";

export default function HomePage({ events }) {
  console.log(events.data[0].attributes.image.data.attributes.formats.thumbnail.url);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length === 0 && <h3>No Events to show</h3>}

      {events.data.map((evt) => (
        <EventItems key={evt.id} evt={evt} />
      ))}

      {events.data.length > 0 && (
        <Link className="btn-secondary" href="/events">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`
  );

  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
