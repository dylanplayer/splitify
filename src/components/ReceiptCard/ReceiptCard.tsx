import { useRouter } from 'next/router';

import styles from './ReceiptCard.module.css';

export interface ReceiptCardProps {
  id: string,
  name: string;
  date: string;
}

export const ReceiptCard = ({id, name, date}: ReceiptCardProps) => {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/dashboard/receipts/${id}`)}
    >
      <h2 className={styles.name}>{name}</h2>
      <time className={styles.date}>{date}</time>
    </div>
  );
}
