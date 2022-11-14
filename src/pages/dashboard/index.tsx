import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import { DashboardPage, ReceiptCard } from '../../components/';
import styles from './index.module.css';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const receipts = [
    {
      id: '1',
      name: 'Receipt 1',
      date: '01/01/2021',
    },
    {
      id: '2',
      name: 'Receipt 1',
      date: '01/01/2021',
    },
    {
      id: '3',
      name: 'Receipt 1',
      date: '01/01/2021',
    },
  ];

  return (
    <DashboardPage
      title='Receipts'
      action={{
        text: 'Split a receipt',
        onClick: () => router.push('/dashboard/receipts/new'),
      }}
    >
    {
      receipts.length === 0 ? (
        <p>You have no receipts.</p>
      ) : (
        <div className={styles.receipts}>
          {
            receipts.map((receipt) => (
              <ReceiptCard
                key={`receipt-${receipt.id}`}
                id={receipt.id}
                name={receipt.name}
                date={receipt.date}
              />
            ))
          }
        </div>
      )
    }
    </DashboardPage>
  )
}

export default Dashboard;
