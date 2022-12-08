import type { GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { type NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';

import { DashboardPage, Loading } from '../../../components/';
import { prisma } from '../../../server/db/client';
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

  if (guest) {
    return {
      redirect: {
        destination: '/dashboard/',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

const Setup: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {data: session, status} = useSession();
  const [phone, setPhone] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const handleSubmit = async () => {
    if (session?.user) {
      setLoading(true);
      await fetch('/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, name: session.user.name }),
      });
      setLoading(false);
      router.push('/dashboard');
    }
  }

  return (
    <DashboardPage
      title="Setup Account"
      action={{
        text: "Submit",
        onClick: handleSubmit,
      }}
    >
      {!loading ? (
        <PhoneInput
          country="US"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          className={styles.input}
        />
      ) : (
        <Loading />
      )}
    </DashboardPage>
  );
}

export default Setup;
