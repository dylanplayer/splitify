import { IoMdArrowRoundBack } from 'react-icons/io';

import DashboardPageAction, { type DashboardPageActionProps } from './components/DashboardPageAction';
import DashboardPageNavbar from './components/DashboardPageNavbar';
import styles from './DashboardPage.module.css';

export interface DashboardPageProps {
  title?: string;
  children?: React.ReactNode;
  action?: DashboardPageActionProps;
  back?: () => void;
}

export const DashboardPage = ({title, action, children, back}: DashboardPageProps) => {
  return (
    <div className={styles.page}>
      <DashboardPageNavbar />
      <main className={styles.container}>
        <div className={styles.header}>
          { 
            back && (
              <button className={styles.back} onClick={back}>
                <IoMdArrowRoundBack size={20} color={'#000000'} />
              </button>
            )
          }
          { title && <h1 className={styles.title}>{title}</h1> }
        </div>
        { children && <div className={styles.content}>{children}</div> }
        { action && <DashboardPageAction {...action} /> }
      </main>
    </div>
  );
}
