import type { GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { type NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { DashboardPage, Loading, ReceiptCard } from '../../components/';
import { useGetReceipts } from '../../hooks';
import { prisma } from '../../server/db/client';
import styles from './index.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const guest = await prisma.guest.findUnique({where: {userId: session.user.id}});

  if (!guest) {
    return {
      redirect: {
        destination: '/dashboard/setup',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

const Dashboard: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {receipts, loading, error} = useGetReceipts();

  if (loading) {
    return (
      <DashboardPage
        title='Receipts'
        action={{
          text: 'Split a receipt',
          onClick: () => router.push('/dashboard/receipts/new'),
        }}
      >
        <Loading />
      </DashboardPage>
    );
  }

  if (error) {
    return (
      <DashboardPage
        title='Receipts'
        action={{
          text: 'Split a receipt',
          onClick: () => router.push('/dashboard/receipts/new'),
        }}
      >
        <div className={styles.error}>
          <p>There was an error loading your receipts.</p>
          <p>Please try again later.</p>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title='Receipts'
      action={{
        text: 'Split a receipt',
        onClick: () => router.push('/dashboard/receipts/new'),
      }}
    >
    {
      !receipts || receipts.length === 0 ? (
        <p>You have no receipts.</p>
      ) : (
        <div className={styles.receipts}>
          {
            receipts.map((receipt) => (
              <ReceiptCard
                key={`receipt-${receipt.id}`}
                id={receipt.id}
                name={receipt.name}
                date={new Date(receipt.date).toLocaleDateString()}
              />
            ))
          }
        </div>
      )
    }
    </DashboardPage>
  );
}

export default Dashboard;
