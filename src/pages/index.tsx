import type { GetServerSideProps, InferGetServerSidePropsType} from "next";
import { type NextPage } from "next";
import { getSession } from "next-auth/react";

import BrochureHero from "../components/BrochureHero/BrochureHero";
import BrochureNavbar from "../components/BrochureNavbar/BrochureNavbar";
import styles from "./index.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Home: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BrochureHero />
      </main>
    </div>
  );
};

export default Home;
