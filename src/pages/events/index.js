import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import EventItems from "@/components/EventItems";

export default function EventsPage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Events Page</h1>
      {events.lenght === 0 && <h3>No Events to show</h3>}
      {events.data.map((evt) => (
        <div>
          <EventItems key={evt.id} evt={evt} />
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&populate=*`
  );
  const events = await res.json();

  // console.log(events);
  return { props: { events }, revalidate: 1 };
}
