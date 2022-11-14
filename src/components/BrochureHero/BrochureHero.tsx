import { signIn } from "next-auth/react";

import styles from './BrochureHero.module.css';

const BrochureHero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Split your receipts the right way</h1>
      <p className={styles.description}>Splitify is the easiest way to split your receipts between your friends and keep track of your spending.</p>
      <button className={styles.action} onClick={() => signIn('google')}>Get Started</button>
    </div>
  );
}

export default BrochureHero;
