import { type NextPage } from "next";

import BrochureHero from "../components/BrochureHero/BrochureHero";
import BrochureNavbar from "../components/BrochureNavbar/BrochureNavbar";
import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <BrochureNavbar />
      <main>
        <BrochureHero />
      </main>
    </div>
  );
};

export default Home;
