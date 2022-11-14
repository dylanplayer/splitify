import Link from 'next/link';
import Image from "next/image";

import { Images } from '../../constants';

import styles from './BrochureNavbar.module.css';

const BrochureNavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.brandContainer}>
        <Link href="/">
          <Image
            src={Images.logo.path}
            alt={Images.logo.alt}
            width={48 * (Images.logo.width / Images.logo.height)}
            height={48}
          />
        </Link>
      </div>
    </div>
  );
}

export default BrochureNavbar;
