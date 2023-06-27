import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItems from "@/components/EventItems";
import Link from "next/link";

export default function SearchPage({ data, term }) {
  console.log(term);
  console.log("Here", data);
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results {term !== null ? `for ${term}` : ""}</h1>

      {data.map((evt) => (
        <EventItems key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  console.log("Search term:", term);

  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`
  );
  const events = await res.json();
  const { data } = events; // Filter the events based on the search term if it exists

  let filteredEvents = data;
  if (term) {
    const searchTerm = term.toLowerCase();
    filteredEvents = data.filter((evt) => {
      const { name, performers, description, venue } = evt.attributes;
      return (
        name.toLowerCase().includes(searchTerm) ||
        performers.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm) ||
        venue.toLowerCase().includes(searchTerm)
      );
    });
  }

  return {
    props: { data: filteredEvents, term: term || null }, // Use null if term is undefined
  };
}
