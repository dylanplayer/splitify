import Link from 'next/link';
import Image from 'next/image';

import { Images } from '../../../../constants';
import styles from './DashboardPageNavbar.module.css';
import { signOut } from 'next-auth/react';

const DashboardPageNavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brandContainer}>
          <Link href="/">
            <Image
              src={Images.logoSlim.path}
              alt={Images.logoSlim.alt}
              width={30 * Images.logoSlim.ratio}
              height={30}
            />
          </Link>
        </div>
        <div>
          <button
            className={styles.button}
            onClick={() => signOut({ callbackUrl: '/' })}
          >Logout</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPageNavbar;