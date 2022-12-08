import type { Guest, Receipt, ReceiptFee, ReceiptGuestItem, ReceiptItem } from "@prisma/client";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { DashboardPage, FeeCreator, FeeList, GuestList, GuestSelector, Input, ItemAssigner, ItemCreator, ItemList, Loading, Review } from "../../../components";
import { prisma } from './../../../server/db/client';
import { useGetFollowing, useGetCurrentGuest } from "../../../hooks";

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

const NewReceipt: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {following, loading: followingLoading} = useGetFollowing();
  const {guest: currentGuest, loading: currentGuestLoading} = useGetCurrentGuest();

  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [friends, setFriends] = useState<Guest[]>([]);
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [fees, setFees] = useState<ReceiptFee[]>([]);
  const [guestItems, setGuestItems] = useState<ReceiptGuestItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/receipts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          guests,
          items,
          fees,
          guestItems,
          date: new Date(date),
        }),
      });

      const receipt: Receipt = await response.json();
      setLoading(false);
      router.push(`/dashboard/receipts/${receipt.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const reset = () => {
    setName("");
    setDate("");
    setGuests([]);
    setItems([]);
    setFees([]);
    setGuestItems([]);
  }

  useEffect(() => {
    if (following) {
      setFriends(following);
    }

    if (currentGuest) {
      setGuests([currentGuest]);
    }
  }, [following, currentGuest]);

  if (currentGuestLoading || followingLoading || loading) {
    return (
      <DashboardPage>
        <Loading />
      </DashboardPage>
    );
  }

  if (pageNumber === 1) {
    return (
      <DashboardPage
        title='Add Guests'
        action={{
          text: 'Continue',
          onClick: () => {guests.length > 0 ? setPageNumber(2) : null},
        }}
        back={() => setPageNumber(0)}
      >
        <GuestSelector
          friends={friends}
          guests={guests}
          setGuests={setGuests}
          setFriends={setFriends}
        />
        {
          (guests.length > 1) && (
            <GuestList
              guests={guests}
              friends={friends}
              setGuests={setGuests}
              setFriends={setFriends}
            />
          )
        }
      </DashboardPage>
    );
  } else if (pageNumber === 2) {
    return (
      <DashboardPage
        title='Add Items'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(3),
        }}
        back={() => setPageNumber(1)}
      >
        <ItemCreator items={items} setItems={setItems} />
        {
          items.length > 0 && (
            <ItemList items={items} setItems={setItems} />
          )
        }
      </DashboardPage>
    );
  } else if (pageNumber === 3) {
    return (
      <DashboardPage
        title='Add Fees'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(4),
        }}
        back={() => setPageNumber(2)}
      >
        <FeeCreator fees={fees} setFees={setFees} />
        {
          fees.length > 0 && (
            <FeeList fees={fees} setFees={setFees} />
          )
        }
      </DashboardPage>
    );
  } else if (pageNumber === 4) {
    return (
      <DashboardPage
        title='Asign Items'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(5),
        }}
        back={() => setPageNumber(3)}
      >
        <ItemAssigner
          items={items}
          guests={guests}
          guestItems={guestItems}
          setGuestItems={setGuestItems}
        />
      </DashboardPage>
    );
  } else if (pageNumber === 5) {
    return (
      <DashboardPage
        title='Review'
        action={{
          text: 'Finish',
          onClick: () => handleSubmit(),
        }}
        back={() => setPageNumber(4)}
      >
        <Review
          items={items}
          guests={guests}
          guestItems={guestItems}
          fees={fees}
        />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title='New Receipt'
      action={{
        text: 'Continue',
        onClick: () => setPageNumber(1),
      }}
      back={() => {
        reset();
        router.push('/dashboard');
      }}
    >
      <Input 
        label='Name'
        placeholder='Enter receipt name'
        value={name}
        onChange={setName}
      />
      <Input
        label='Date'
        placeholder='Enter receipt date'
        value={date}
        onChange={setDate}
        type='date'
        max={new Date().toISOString().split('T')[0]}
      />
    </DashboardPage>
  );
}

export default NewReceipt;
