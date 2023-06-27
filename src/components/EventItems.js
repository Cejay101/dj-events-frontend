import Link from "next/link";
import Image from "next/image";
import styles from "../styles/EventItems.module.css";
export default function EventItems({ evt }) {
  console.log(evt);
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.attributes.image.data === null
              ? "/images/event-default.png"
              : evt.attributes.image.data.attributes.formats.thumbnail.url
          }
          height={100}
          width={170}
          alt={"image"}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
}
