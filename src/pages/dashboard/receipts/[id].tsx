import type { GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { type NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { DashboardPage, Loading, Review } from '../../../components/';
import { useGetReceipt } from '../../../hooks';
import { prisma } from '../../../server/db/client';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user || !context?.params?.id || typeof context.params.id !== 'string') {
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
    props: {},
  }
}

const Dashboard: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { loading, receipt, error } = useGetReceipt({ id: String(router.query.id) });

  if (loading) {
    return <Loading />;
  }

  if (!receipt || error) {
    router.push('/dashboard');
  }

  return (
    <DashboardPage
      title='Receipts'
      back={() => router.push('/dashboard')}
    >
      <Review
        items={receipt.items}
        guests={receipt.guests}
        guestItems={receipt.guestItems}
        fees={receipt.fees}
      />
    </DashboardPage>
  );
}

export default Dashboard;
