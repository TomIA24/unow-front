import loupe from "../assets/loupe.svg";
import styles from "./styles.module.css";

const SearchBar = ({ search, setSearch }) => (
  <div className={styles.explore_container}>
    <button className={styles.explore_btn} type="button">
      Explore
    </button>

    <input
      type="text"
      defaultValue={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Type here..."
    />

    <button className={styles.search_btn} type="button">
      <img src={loupe} alt="search" className={styles.icon_search} />
    </button>
  </div>
);

export default SearchBar;
