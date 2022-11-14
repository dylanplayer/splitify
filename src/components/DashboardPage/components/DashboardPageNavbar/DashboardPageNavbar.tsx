import Link from 'next/link';
import Image from 'next/image';

import { Images } from '../../../../constants';
import styles from './DashboardPageNavbar.module.css';

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
          Link Link Link
        </div>
      </div>
    </div>
  );
}

export default DashboardPageNavbar;