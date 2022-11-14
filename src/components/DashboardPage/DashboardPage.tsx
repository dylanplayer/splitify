import DashboardPageAction, { type DashboardPageActionProps } from './components/DashboardPageAction';
import DashboardPageNavbar from './components/DashboardPageNavbar';
import styles from './DashboardPage.module.css';

export interface DashboardPageProps {
  title?: string;
  children?: React.ReactNode;
  action?: DashboardPageActionProps;
}

export const DashboardPage = ({title, action, children}: DashboardPageProps) => {
  return (
    <div className={styles.page}>
      <DashboardPageNavbar />
      <main className={styles.container}>
        { title && <h1 className={styles.title}>{title}</h1> }
        { children && <div className={styles.content}>{children}</div> }
        { action && <DashboardPageAction {...action} /> }
      </main>
    </div>
  );
}
