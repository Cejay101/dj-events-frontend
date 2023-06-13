import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import EventItems from "@/components/EventItems";
export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.lenght === 0 && <h3>No Events to show</h3>}
      {events.map((evt) => (
        <EventItems key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link className="btn-secondary" href="/events">
          View of all Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}api/events`);
  const events = await res.json();

  // console.log(events);
  return { props: { events: events.slice(0, 3) }, revalidate: 1 };
}
