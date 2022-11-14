import styles from './DashboardPageAction.module.css';

export interface DashboardPageActionProps {
  text?: string;
  onClick?: () => void;
}

const DashboardPageAction = ({text, onClick}: DashboardPageActionProps) => {
  return (
    <button className={styles.action} onClick={onClick}>
      {text}
    </button>
  );
}

export default DashboardPageAction;
