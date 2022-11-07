import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react"

import styles from "./index.module.css";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
};

export default Home;
