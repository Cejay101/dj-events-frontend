import styles from "../styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  console.log(router)
  const handleSubmit =(e)=>{
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
    
  }
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTerm(e.target.value)} value={term } placeholder="Search Events" />
      </form>
    </div>
  );
}
