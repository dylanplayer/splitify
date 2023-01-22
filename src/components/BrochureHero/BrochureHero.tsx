import { signIn } from "next-auth/react";

import styles from './BrochureHero.module.css';

const BrochureHero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Splitify</h1>
      <p className={styles.subtitle}>The best way to split your receipts</p>
      <button className={styles.action} onClick={() => signIn('google')}>Get Started</button>
    </div>
  );
}

export default BrochureHero;
